import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType } from 'src/shared/constants/auth.constant';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { UserInfoBodyReq } from '@route/user/user.dto';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { UserType } from '@shared/models/user.model';
import { UserInformationAllowed } from '@route/user/user.schema';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  getInfo(@ActiveUser('id') id: number): Promise<UserInformationAllowed> {
    return this.userService.getInfo(id);
  }

  @Post('/info')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @HttpCode(HttpStatus.OK)
  updateInfo(
    @ActiveUser('id') id: number,
    @Body() body: UserInfoBodyReq,
  ): Promise<UserInformationAllowed> {
    return this.userService.updateInfo(id, body);
  }
}
