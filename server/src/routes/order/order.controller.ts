import {
  Body,
  Controller,
  Get,
  Inject,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto, SearchOrderDto } from '@route/order/order.dto';
import {
  CreateOrderResType,
  OrderDetailResType,
  OrderResType,
} from '@route/order/order.schema';
import { AuthType } from '@shared/constants/auth.constant';
import { ActiveUser } from '@shared/decorators/active-user.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { SepayPaymentService } from '@shared/services/payment/sepay.service';
import { VnpayPaymentService } from '@shared/services/payment/vnpay.service';
import { OrderService } from './order.service';
import { Paging } from '@shared/common/interfaces/paging.interface';
@Controller('/api/v1/orders')
export class OrderController {
  constructor(@Inject() private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Create order for customer')
  @Auth([AuthType.Bearer])
  async createOrder(
    @ActiveUser('id') userId: number,
    @Body() dto: CreateOrderDto,
    @Ip() ip: string,
  ): Promise<CreateOrderResType | null> {
    const payment = await this.orderService.createOrder(userId, dto);
    const orderId = payment.orderId;
    const paymentId = payment.id;
    const totalAmount = payment.totalAmount;

    if (dto.method === 'SEPAY') {
      const paymentService = new SepayPaymentService(paymentId, totalAmount);
      return {
        orderId,
        paymentId,
        totalAmount,
        type: 'QR_CODE',
        url: paymentService.generatePaymentUrl(),
      };
    }
    if (dto.method === 'VNPAY') {
      const paymentService = new VnpayPaymentService(
        paymentId,
        totalAmount,
        ip,
      );
      return {
        orderId,
        paymentId,
        totalAmount,
        type: 'REDIRECT',
        url: paymentService.generatePaymentUrl(),
      };
    }
    return null;
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Paging order for customer')
  @Auth([AuthType.Bearer])
  search(
    @ActiveUser('id') userId: number,
    @Query() search: SearchOrderDto,
  ): Promise<Paging<OrderResType>> {
    return this.orderService.search(userId, search);
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Paging order for customer')
  @Auth([AuthType.Bearer])
  getDetail(
    @ActiveUser('id') userId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<OrderDetailResType> {
    return this.orderService.getDetail(userId, orderId);
  }
}
