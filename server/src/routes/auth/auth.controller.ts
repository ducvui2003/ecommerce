import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { RegisterReqDTO, RegisterResDTO } from 'src/routes/auth/auth.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterReqDTO) {
    console.log(body);

    const userCreated = await this.authService.register(body);
    return userCreated;
  }

  @Post('login')
  login(@Body() body: RegisterReqDTO) {
    return 'hello';
  }
}
