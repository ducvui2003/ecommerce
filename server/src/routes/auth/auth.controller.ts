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
  RefreshReqDTO,
  RefreshResDTO,
  RegisterReqDTO,
  RegisterResDTO,
} from 'src/routes/auth/auth.dto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/shared/guards/acces-token.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
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

  @UseGuards(AccessTokenGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshReqDTO) {
    const res = await this.authService.refreshToken(body.refreshToken);
    return new RefreshResDTO(res);
  }
}
