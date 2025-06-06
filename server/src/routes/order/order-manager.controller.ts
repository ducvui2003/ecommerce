import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { SearchOrderManagerDto } from '@route/order/order.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderManagerService } from '@route/order/order-manager.service';
import { OrderResType } from '@route/order/order-manager.schema';
@Controller('/api/v1/manager/orders')
export class OrderManagerController {
  constructor(@Inject() private readonly orderService: OrderManagerService) {}

  @Get('search')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Paging order for admin')
  @Auth([AuthType.Bearer])
  search(
    @Query() search: SearchOrderManagerDto,
  ): Promise<Paging<OrderResType>> {
    return this.orderService.search(search);
  }
}
