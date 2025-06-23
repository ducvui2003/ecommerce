import envConfig from '@config/env.config';
import { Inject, Injectable } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import {
  ChangePasswordBodyDTO,
  ForgetPasswordBodyDTO,
  LoginReqDTO,
  RegisterReqDTO,
  SendOTPBodyDTO,
  VerifyOTPBodyDTO,
} from '@route/auth/auth.dto';
import {
  EmailExistException,
  EmailNotExistException,
  EmailUnauthorizedException,
  OTPExpiredException,
  OTPInvalidException,
  PasswordIncorrectException,
  TokenInvalidException,
  TokenRevokedException,
} from '@route/auth/auth.error';
import { AuthRepository } from '@route/auth/auth.repository';
import { RefreshResType } from '@route/auth/auth.schema';
import { SHARED_USER_REPOSITORY } from '@shared/constants/dependency.constant';
import { UserNotFoundException } from '@shared/exceptions/user.exception';
import { generateOTP, isNotFoundError } from '@shared/helper.shared';
import { SharedUserRepository } from '@shared/repositories/shared-user.repository';
import { CacheService } from '@shared/services/cache/cache.service';
import {
  keyRefreshToken,
  keyVerificationCode,
} from '@shared/services/cache/cache.util';
import { HashingService } from '@shared/services/hashing.service';
import { MailFactory } from '@shared/services/mail/mail-factory.service';
import { RoleService } from '@shared/services/role.service';
import { TokenService } from '@shared/services/token.service';
import { JwtCustomClaims, JwtData } from '@shared/types/jwt.type';
import { addMilliseconds } from 'date-fns';
import ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    @Inject(SHARED_USER_REPOSITORY)
    private readonly userRepository: SharedUserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: TokenService,
    private readonly roleService: RoleService,
    private readonly mailFactory: MailFactory,
    private readonly cacheService: CacheService,
  ) {}

  async register(req: RegisterReqDTO) {
    return this.verifyOTPAndDelete(
      // 1. Kiểm tra otp, nếu otp có thì xóa otp và thực hiện callback
      // 2. Nếu otp không có thì ném ra exception
      {
        code: req.otp,
        email: req.email,
        type: 'REGISTER',
      },
      async () => {
        // 2. Tạo user
        const hashing = await this.hashingService.hash(req.password);
        const clientRoleId = await this.roleService.getClientRoleId();
        const userCreated = await this.authRepository.createUser({
          email: req.email,
          name: req.name,
          password: hashing,
          roleId: clientRoleId,
        });
        return userCreated;
      },
    );
  }

  async sendOTP(
    data: SendOTPBodyDTO,
    strictEmail: 'exist' | 'not-exist' | 'none' = 'none',
  ) {
    switch (strictEmail) {
      case 'exist': {
        // 1. Kiểm tra email có tồn tại chưa?
        const userExist = await this.userRepository.findUnique({
          email: data.email,
        });
        if (!userExist) {
          throw EmailNotExistException;
        }
        break;
      }
      case 'not-exist': {
        // 1. Kiểm tra email có ko tồn tại chưa?
        const userExist = await this.userRepository.findUnique({
          email: data.email,
        });
        if (userExist) {
          throw EmailExistException;
        }
        break;
      }
    }

    // 2. Tạo OTP
    const otp = generateOTP();

    // 3. Lưu OTP
    const key = keyVerificationCode(data.email, data.type);
    const ttl = ms(envConfig.OTP_EXPIRY);
    const expiredAt = addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRY));
    this.cacheService.set<string>(key, otp, ttl);

    // 4. Gửi email
    this.mailFactory.getEmailService(data.type).send({
      to: data.email,
      name: data.email,
      validationCode: otp,
    });

    return { ...data, expiredAt: expiredAt };
  }

  async login(req: LoginReqDTO) {
    // 1. Kiểm tra user có email này không?
    const user = await this.userRepository.findUnique({ email: req.email });

    if (!user) {
      throw EmailUnauthorizedException;
    }

    // 2. Kiểm tra password
    const isPasswordMatch = await this.hashingService.compare(
      user.password,
      req.password,
    );

    if (!isPasswordMatch) {
      throw PasswordIncorrectException;
    }

    // 3. Tạo AT và RT
    const [accessToken, refreshToken] = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    // 4. Lưu refresh token vào redis
    this.saveRefreshTokenToRedis(refreshToken, user.id);

    return {
      id: user.id,
      email: user.email,
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
      exp: accessToken.exp,
    };
  }

  async refreshToken(token: string): Promise<RefreshResType> {
    try {
      // 1. Decode refresh token
      const { id, email, jti, role } =
        await this.jwtService.verifyRefreshToken(token);

      // 2. Kiểm tra refresh token có tồn tại trong redis không?
      const exist = await this.cacheService.exist(keyRefreshToken(id, jti));
      if (!exist) {
        throw TokenRevokedException;
      }

      // 3. Xóa refresh token cũ trong redis
      await this.cacheService.del(keyRefreshToken(id, jti));

      // 4. Tạo mới access token và refresh token
      const [accessToken, refreshToken] = await this.generateToken({
        id,
        email,
        role,
      });

      // 5. Lưu refresh token vào redis
      this.saveRefreshTokenToRedis(refreshToken, id);

      return {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
        exp: accessToken.exp,
      };
    } catch (error) {
      // Xử lý trường hợp token đã bị mất
      if (isNotFoundError(error)) {
        throw TokenRevokedException;
      }
      throw error;
    }
  }

  async logout(token: string): Promise<void> {
    try {
      // 1. Decode refresh token
      const { id, jti } = await this.jwtService.verifyRefreshToken(token);

      // 2. Xóa refresh token có trong redis không
      const deleted = await this.cacheService.del(keyRefreshToken(id, jti));

      // 3. Xử lý trường hợp token không có trong redis
      if (!deleted) {
        throw TokenRevokedException;
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw TokenRevokedException;
      } else if (error instanceof JsonWebTokenError) {
        throw TokenInvalidException;
      }
    }
  }

  async verifyOTP(req: VerifyOTPBodyDTO): Promise<void> {
    // 1. Tạo key
    const key = keyVerificationCode(req.email, req.type);

    // 2. Kiểm tra key có tồn tại không?
    const code = await this.cacheService.get(key);
    if (!code) {
      throw OTPExpiredException;
    }

    // 3. Kiẻm tra value trong redis == code không?
    if (code !== req.code) {
      throw OTPInvalidException;
    }
    await this.authRepository.updateStatus(req.email, 'ACTIVE');
  }

  async forgotPassword(req: ForgetPasswordBodyDTO): Promise<void> {
    const { email, otp, password } = req;

    await this.verifyOTPAndDelete(
      {
        email,
        code: otp,
        type: 'FORGOT_PASSWORD',
      },
      async () => {
        const hashing = await this.hashingService.hash(password);
        await this.authRepository.updatePassword(email, hashing);
      },
    );
  }

  async changePassword(id: number, req: ChangePasswordBodyDTO) {
    const user = await this.userRepository.findUnique({
      id: id,
    });
    if (user) {
      const isPasswordMatch = await this.hashingService.compare(
        user.password,
        req.password,
      );
      if (isPasswordMatch) {
        const newHashPW = await this.hashingService.hash(req.newPassword);
        this.authRepository.updatePassword(user.email, newHashPW);
      } else {
        throw PasswordIncorrectException;
      }
    } else {
      throw new UserNotFoundException();
    }
  }

  /**
   * Kiểm tra otp có hợp lệ không?
   * Nếu hợp lệ thì thưc hiện callback và tiến hành xóa
   *  Nếu trong quá trình thực hiện callback xảy ra lỗi, otp sẽ không được xóa
   * Nếu không thì ném exception
   */
  private async verifyOTPAndDelete(
    req: VerifyOTPBodyDTO,
    callback: () => Promise<unknown>,
  ) {
    // 1. Tạo key
    const key = keyVerificationCode(req.email, req.type);

    // 2. Kiểm tra key có tồn tại không?
    const code = await this.cacheService.get(key);
    if (!code) {
      throw OTPExpiredException;
    }

    // 3. Kiẻm tra value trong redis == code không?
    if (code !== req.code) {
      throw OTPInvalidException;
    }

    const response = await callback();

    this.cacheService.del(key);

    return response;
  }

  /**
   * Tạo cặp AT và RT, Lưu RT vào redis
   */
  async generateToken(payload: JwtCustomClaims): Promise<JwtData[]> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken(payload),
      this.jwtService.signRefreshToken(payload),
    ]);

    const result: JwtData[] = [accessToken, refreshToken];

    return result;
  }

  private saveRefreshTokenToRedis(refreshToken: JwtData, userId: number) {
    const ttl = refreshToken.exp - refreshToken.iat;
    this.cacheService.set(
      keyRefreshToken(userId, refreshToken.jti),
      refreshToken,
      ttl * 1000,
    );
  }
}
