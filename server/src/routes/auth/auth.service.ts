import envConfig from '@config/env.config';
import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  LoginReqDTO,
  RegisterReqDTO,
  SendOTPBodyDTO,
} from '@route/auth/auth.dto';
import { AuthRepository } from '@route/auth/auth.repository';
import { RoleService } from '@route/auth/role.service';
import { VerificationType } from '@shared/constants/auth.constant';
import {
  generateOTP,
  isNotFoundError,
  isUniqueConstraintError,
} from '@shared/helper.shared';
import { UserRepository } from '@shared/repositories/user.repository';
import { HashingService } from '@shared/services/hashing.service';
import { TokenService } from '@shared/services/token.service';
import { JWTPayload } from '@shared/types/jwt.type';
import { addMilliseconds } from 'date-fns';
import ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: TokenService,
    private readonly roleService: RoleService,
  ) {}

  async register(req: RegisterReqDTO) {
    try {
      // 1. Kiểm tra OTP có tồn tại chưa?
      const verificationCode =
        await this.authRepository.findUniqueVerificationCode({
          code: req.otp,
          email: req.email,
          type: VerificationType.REGISTER,
        });
      if (!verificationCode) {
        throw new UnprocessableEntityException([
          {
            field: 'code',
            error: 'OTP not valid',
          },
        ]);
      }

      // 2. Kiểm tra OTP đã hết hạn chưa?
      if (verificationCode.expiredAt < new Date()) {
        throw new UnprocessableEntityException([
          {
            field: 'code',
            error: 'OTP is expired',
          },
        ]);
      }

      // 3. Tạo user
      const hashing = await this.hashingService.hash(req.password);
      const clientRoleId = await this.roleService.getClientRoleId();
      const userCreated = await this.authRepository.createUser({
        email: req.email,
        name: req.name,
        password: hashing,
        roleId: clientRoleId,
      });

      // 4. Xóa OTP
      await this.authRepository.deleteVerificationCode({
        email: req.email,
        code: req.otp,
        type: VerificationType.REGISTER,
      });

      return userCreated;
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new UnprocessableEntityException([
          {
            field: 'email',
            error: 'email has exist',
          },
        ]);
      }
      throw error;
    }
  }

  async sendOTP(data: SendOTPBodyDTO) {
    // 1. Kiểm tra OTP có tồn tại chưa?
    const userExist = await this.userRepository.findUnique({
      email: data.email,
    });
    if (userExist) {
      throw new UnprocessableEntityException([
        {
          path: 'email',
          error: 'email is exist',
        },
      ]);
    }

    // 2. Tạo OTP
    const otp = generateOTP();
    const verificationCode = await this.authRepository.createVerificationCode({
      email: data.email,
      type: data.type,
      code: otp,
      expiredAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRY)),
    });
    return { ...data, expiredAt: verificationCode.expiredAt };
  }

  async login(req: LoginReqDTO) {
    const user = await this.userRepository.findUnique({ email: req.email });

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

    return {
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      exp: tokens.exp,
    };
  }

  async generateToken(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken(payload),
      this.jwtService.signRefreshToken(payload),
    ]);

    // Lưu refresh token vào database
    const decodeRefreshToken =
      await this.jwtService.verifyRefreshToken(refreshToken);

    const exp: Date = new Date(decodeRefreshToken.exp || 0 * 1000);

    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId: payload.id,
      expiredAt: exp,
    });

    return {
      accessToken,
      refreshToken,
      exp: decodeRefreshToken.exp || 0,
    };
  }

  async refreshToken(token: string) {
    try {
      // 1. Decode refresh token
      const { id, email } = await this.jwtService.verifyRefreshToken(token);

      // 2. Kiểm tra refresh token có tồn tại trong database không
      // Nếu ko tồn tại thì refresh token đã bị mất
      await this.authRepository.findRefreshTokenOrThrown(id, token);

      // 3. Xóa refresh token cũ
      await this.authRepository.deleteRefreshToken(id, token);

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

  async logout(token: string) {
    try {
      // 1. Decode refresh token
      const { id } = await this.jwtService.verifyRefreshToken(token);

      // 2. Xóa refresh token có trong database không
      await this.authRepository.deleteRefreshToken(id, token);

      return true;
    } catch (error) {
      // Xử lý trường hợp token đã bị mất
      // P2025 là mã lỗi của Prisma khi không tìm thấy dữ liệu
      if (isNotFoundError(error)) {
        throw new UnauthorizedException('Token has been revoked');
      }
      throw new UnauthorizedException('Error when refresh token');
    }
  }
}
