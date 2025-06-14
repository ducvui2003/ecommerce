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
    console.log(search);
    return this.orderService.search(search);
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Get order detail for customer')
  @Auth([AuthType.Bearer])
  getDetail(
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<OrderDetailResType> {
    return this.orderService.getDetail(orderId);
  }
  @Get('/status/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Get order detail for customer')
  @Auth([AuthType.Bearer])
  getStatus(
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<OrderStatusType[]> {
    return this.orderService.getOrderStatusCanChange(orderId);
  }

  @Put('/status/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Get order detail for customer')
  @Auth([AuthType.Bearer])
  changeStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() body: ChangeOrderManagerDto,
  ): Promise<void> {
    return this.orderService.changeStatus(orderId, body.status);
  }
}
