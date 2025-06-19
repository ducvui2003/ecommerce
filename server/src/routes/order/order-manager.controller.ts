import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import {
  ChangeOrderManagerDto,
  SearchOrderManagerDto,
} from '@route/order/order.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderManagerService } from '@route/order/order-manager.service';
import {
  OrderDetailResType,
  OrderResType,
} from '@route/order/order-manager.schema';
import { OrderStatusType } from '@shared/constants/order.constant';
import { RolesGuard } from '@shared/guards/role.guard';
import { Roles } from '@shared/decorators/roles.decorator';
@Controller('/api/v1/manager/orders')
@UseGuards(AuthenticationGuard, RolesGuard)
@Auth([AuthType.Bearer])
@Roles('ADMIN')
export class OrderManagerController {
  constructor(@Inject() private readonly orderService: OrderManagerService) {}

  @Get('search')
  @MessageHttp('Paging order for admin')
  search(
    @Query() search: SearchOrderManagerDto,
  ): Promise<Paging<OrderResType>> {
    console.log(search);
    return this.orderService.search(search);
  }

  @Get('/:id')
  @MessageHttp('Get order detail for customer')
  getDetail(
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<OrderDetailResType> {
    return this.orderService.getDetail(orderId);
  }
  @Get('/status/:id')
  @MessageHttp('Get order detail for customer')
  getStatus(
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<OrderStatusType[]> {
    return this.orderService.getOrderStatusCanChange(orderId);
  }

  @Put('/status/:id')
  @MessageHttp('Get order detail for customer')
  changeStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() body: ChangeOrderManagerDto,
  ): Promise<void> {
    return this.orderService.changeStatus(orderId, body.status);
  }
}
