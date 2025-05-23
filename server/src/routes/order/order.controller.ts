import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateOrderDto, CreateOrderSchema } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(@Inject() private readonly orderService: OrderService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(CreateOrderSchema))
  createOrder(@Body() order: CreateOrderDto): Promise<void> {
    const result = CreateOrderSchema.safeParse(order);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return this.orderService.createOrder(order);
  }
}
