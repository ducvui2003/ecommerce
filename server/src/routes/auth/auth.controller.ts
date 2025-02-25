import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  LoginReqDTO,
  LoginResDTO,
  LogoutReqDTO,
  RefreshReqDTO,
  RefreshResDTO,
  RegisterReqDTO,
  RegisterResDTO,
} from 'src/routes/auth/auth.dto';
import { AuthType } from 'src/shared/constants/auth.constant';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterReqDTO) {
    const userCreated = await this.authService.register(body);
    return new RegisterResDTO(userCreated);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginReqDTO) {
    const res = await this.authService.login(body);
    return new LoginResDTO(res);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshReqDTO) {
    const res = await this.authService.refreshToken(body.refreshToken);
    return new RefreshResDTO(res);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() body: LogoutReqDTO) {
    return this.authService.logout(body.refreshToken);
  }
}
