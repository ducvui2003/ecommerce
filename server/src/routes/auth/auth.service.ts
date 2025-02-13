import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginReqDTO, RegisterReqDTO } from 'src/routes/auth/auth.dto';
import {
  isNotFoundError,
  isUniqueConstraintError,
} from 'src/shared/helper.shared';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';
import { JWTPayload } from 'src/shared/types/jwt.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: TokenService,
  ) {}
  async register(req: RegisterReqDTO) {
    try {
      const hashing = await this.hashingService.hash(req.password);
      const userCreated = await this.prismaService.user.create({
        data: {
          email: req.email,
          name: req.name,
          password: hashing,
        },
      });
      return userCreated;
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async login(req: LoginReqDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const isPasswordMatch = await this.hashingService.compare(
      user.password,
      req.password,
    );

    if (!isPasswordMatch) {
      throw new UnprocessableEntityException([
        {
          field: 'password',
          message: 'Password is incorrect',
        },
      ]);
    }
    const tokens = await this.generateToken({
      id: user.id,
      email: user.email,
    });

    return tokens;
  }

  async generateToken(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken(payload),
      this.jwtService.signRefreshToken(payload),
    ]);

    // Lưu refresh token vào database
    const decodeRefreshToken =
      await this.jwtService.verifyRefreshToken(refreshToken);

    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.id,
        expiredAt: new Date(decodeRefreshToken.exp || 0 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      // 1. Decode refresh token
      const { id, email } = await this.jwtService.verifyRefreshToken(token);

      // 2. Kiểm tra refresh token có tồn tại trong database không
      // Nếu ko tồn tại thì refresh token đã bị mất
      await this.prismaService.refreshToken.findFirstOrThrow({
        where: {
          token: token,
          userId: id,
        },
      });

      // 3. Xóa refresh token cũ
      await this.prismaService.refreshToken.deleteMany({
        where: {
          userId: id,
          token: token,
        },
      });

      // 4. Tạo mới access token và refresh token
      return await this.generateToken({ id, email });
    } catch (error) {
      // Xử lý trường hợp token đã bị mất
      // P2025 là mã lỗi của Prisma khi không tìm thấy dữ liệu
      if (isNotFoundError(error)) {
        throw new UnauthorizedException('Token has been revoked');
      }
      console.error(error);
      throw new UnauthorizedException('Error when refresh token');
    }
  }
}
