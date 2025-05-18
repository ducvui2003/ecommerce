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
import { GetUserDetailResType, GetUserResType } from '@route/user/user.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { AuthType } from '@shared/constants/auth.constant';
import { Auth } from '@shared/decorators/auth.decorator';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/manager/user')
export class UserManagerController {
  constructor(private readonly userService: UserManagerService) {}
  @Get('/list')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @MessageHttp('Paging user for manager')
  getListUser(
    @Query() query: GetUserQueryDTO,
  ): Promise<Paging<GetUserResType>> {
    return this.userService.getList(query);
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Get detail user for manager')
  @Auth([AuthType.Bearer])
  getDetailUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetUserDetailResType> {
    return this.userService.getDetail(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put('/block/:id')
  blockUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.changeStatus(id, 'BLOCKED');
  }

  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.Bearer])
  @Put('/unblock/:id')
  unblockUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.changeStatus(id, 'ACTIVE');
  }
}
