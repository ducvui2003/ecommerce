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
import { RolesGuard } from '@shared/guards/role.guard';

@Controller('/api/v1/manager/user')
@UseGuards(AuthenticationGuard, RolesGuard)
@Auth([AuthType.Bearer])
export class UserManagerController {
  constructor(private readonly userService: UserManagerService) {}
  @Get('/list')
  @MessageHttp('Paging user for manager')
  getListUser(
    @Query() query: GetUserQueryDTO,
  ): Promise<Paging<GetUserResType>> {
    return this.userService.getList(query);
  }

  @Get('/:id')
  @MessageHttp('Get detail user for manager')
  getDetailUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetUserDetailResType> {
    return this.userService.getDetail(userId);
  }

  @Put('/block/:id')
  blockUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.changeStatus(id, 'BLOCKED');
  }

  @Put('/unblock/:id')
  unblockUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.changeStatus(id, 'ACTIVE');
  }
}
