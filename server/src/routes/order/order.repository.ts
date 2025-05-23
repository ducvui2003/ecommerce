import { PrismaService } from '@shared/services/prisma.service';
import { OrderStatusEnum } from '@shared/models/order.model';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(data: {
    userId: number;
    totalAmount: number;
    feeShipping: number;
    receiver: any;
  }) {
    return this.prismaService.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        feeShipping: data.feeShipping,
        receiver: data.receiver,
        status: OrderStatusEnum.enum.PENDING,
      },
    });
  }

  async createOrderItem(data: {
    orderId: number;
    quantity: number;
    price: number | Prisma.Decimal;
    product: any;
  }) {
    return this.prismaService.orderItem.create({
      data: {
        orderId: data.orderId,
        quantity: data.quantity,
        price: data.price,
        product: data.product,
      },
    });
  }
}
