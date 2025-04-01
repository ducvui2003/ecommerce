import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUser } from 'src/shared/decorators/actice-user.decorator';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType } from 'src/shared/constants/auth.constant';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { UserInfoBodyReq } from '@route/user/user.dto';
import { InfoAllow } from '@route/user/user.type';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  getInfo(@ActiveUser('id') id: number): Promise<InfoAllow> {
    return this.userService.getInfo(id);
  }

  @Post('/info')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  updateInfo(
    @ActiveUser('id') id: number,
    @Body() body: UserInfoBodyReq,
  ): Promise<InfoAllow> {
    return this.userService.updateInfo(id, body);
  }
}
