import envConfig from '@config/env.config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  ForgetPasswordBodyDTO,
  LoginReqDTO,
  RegisterReqDTO,
  SendOTPBodyDTO,
} from '@route/auth/auth.dto';
import { AuthRepository } from '@route/auth/auth.repository';
import {
  EmailExistException,
  EmailNotExistException,
  EmailUnauthorizedException,
  OTPExpiredException,
  OTPInvalidException,
  PasswordIncorrectException,
  TokenRevokedException,
} from '@route/auth/error.model';
import { RoleService } from '@route/auth/role.service';
import {
  TypeOfVerificationType,
  VerificationType,
} from '@shared/constants/auth.constant';
import {
  generateOTP,
  isNotFoundError,
  isUniqueConstraintError,
} from '@shared/helper.shared';
import { UserRepository } from '@shared/repositories/user.repository';
import { HashingService } from '@shared/services/hashing.service';
import { MailFactory } from '@shared/services/mail/mail-factory.service';
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
    private readonly mailFactory: MailFactory,
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
        throw OTPInvalidException;
      }

      // 2. Kiểm tra OTP đã hết hạn chưa?
      if (verificationCode.expiredAt < new Date()) {
        throw OTPExpiredException;
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
        throw EmailExistException;
      }
      throw error;
    }
  }

  async sendOTP(data: SendOTPBodyDTO, strictEmail: boolean = false) {
    if (strictEmail) {
      // 1. Kiểm tra email có tồn tại chưa?
      const userExist = await this.userRepository.findUnique({
        email: data.email,
      });
      if (!userExist) {
        throw EmailNotExistException;
      }
    }

    // 2. Tạo OTP
    const otp = generateOTP();
    const verificationCode = await this.authRepository.createVerificationCode({
      email: data.email,
      type: data.type,
      code: otp,
      expiredAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRY)),
    });

    // Not await
    this.mailFactory.getEmailService(data.type).send({
      to: data.email,
      name: data.email,
      validationCode: otp,
    });

    return { ...data, expiredAt: verificationCode.expiredAt };
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

  /**
   * Tạo cặp AT và RT, Lưu RT vào database
   */
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
      if (isNotFoundError(error)) {
        throw TokenRevokedException;
      }
      throw error;
    }
  }

  async logout(token: string): Promise<void> {
    try {
      // 1. Decode refresh token
      const { id } = await this.jwtService.verifyRefreshToken(token);

      // 2. Xóa refresh token có trong database không
      await this.authRepository.deleteRefreshToken(id, token);
    } catch (error) {
      // Xử lý trường hợp token đã bị mất
      if (isNotFoundError(error)) {
        throw TokenRevokedException;
      }
      throw error;
    }
  }

  async forgotPassword(req: ForgetPasswordBodyDTO): Promise<void> {
    const { email, otp, password } = req;
    // 1. Kiểm tra email có tồn tại trong database
    const isEmailExist = await this.authRepository.existEmail(email);

    if (!isEmailExist) throw EmailNotExistException;

    // 2. Kiểm tra otp có hợp lệ hay không?
    await this.validationCode({
      email,
      code: otp,
      type: 'FORGOT_PASSWORD',
    });

    const hashing = await this.hashingService.hash(password);
    await this.authRepository.updatePassword(email, hashing);

    // 3. Xóa OTP
    await this.authRepository.deleteVerificationCode({
      email: req.email,
      code: req.otp,
      type: VerificationType.FORGOT_PASSWORD,
    });
  }

  private async validationCode({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: TypeOfVerificationType;
  }) {
    // 1. Kiểm tra OTP có tồn tại chưa?
    const verificationCode =
      await this.authRepository.findUniqueVerificationCode({
        code: code,
        email: email,
        type: type,
      });
    if (!verificationCode) {
      throw OTPInvalidException;
    }

    // 2. Kiểm tra OTP đã hết hạn chưa?
    if (verificationCode.expiredAt < new Date()) {
      throw OTPExpiredException;
    }
  }
}
