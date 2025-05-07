import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserManagerService } from '@route/user/user-manger.service';
import { GetUserQueryDTO } from '@route/user/user.dto';
import { AuthType } from '@shared/constants/auth.constant';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/manager/user')
export class UserManagerController {
  constructor(private readonly userService: UserManagerService) {}
  @Get('/list')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  getListUser(@Query() query: GetUserQueryDTO) {
    return this.userService.getList(query);
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  getDetailUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getDetail(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put('/block')
  blockUser() {}

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put('/update')
  updateUser() {}
}
