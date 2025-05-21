import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  LoginResSchema,
  RefreshResSchema,
  RegisterResSchema,
} from '@route/auth/auth.schema';
import { AuthType } from '@shared/constants/auth.constant';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import {
  ChangePasswordBodyDTO,
  ForgetPasswordBodyDTO,
  LoginReqDTO,
  LogoutReqDTO,
  RefreshReqDTO,
  RegisterReqDTO,
  SendOTPBodyDTO,
  VerifyOTPBodyDTO,
} from '@route/auth/auth.dto';
import { AuthService } from '@route/auth/auth.service';
import { ActiveUser } from '@shared/decorators/active-user.decorator';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() body: RegisterReqDTO) {
    const userCreated = await this.authService.register(body);
    return RegisterResSchema.parse(userCreated);
  }

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOTP(@Body() body: SendOTPBodyDTO) {
    let res;
    if (body.type === 'REGISTER') {
      res = await this.authService.sendOTP(body, 'not-exist');
    }
    if (body.type === 'FORGOT_PASSWORD') {
      res = await this.authService.sendOTP(body, 'exist');
    }
    return res;
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOTP(@Body() body: VerifyOTPBodyDTO) {
    await this.authService.verifyOTP(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginReqDTO) {
    const res = await this.authService.login(body);
    return LoginResSchema.parse(res);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshReqDTO) {
    const res = await this.authService.refreshToken(body.refreshToken);
    return RefreshResSchema.parse(res);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() body: LogoutReqDTO) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('/forget-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() body: ForgetPasswordBodyDTO) {
    return this.authService.forgotPassword(body);
  }

  @Put('/password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  changePassword(
    @ActiveUser('id') id: number,
    @Body() body: ChangePasswordBodyDTO,
  ) {
    console.log('id', id);
    return this.authService.changePassword(id, body);
  }
}
