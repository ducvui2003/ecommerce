import { PrismaService } from '@shared/services/prisma.service';
import { OrderStatusEnum, OrderType } from '@shared/models/order.model';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { OrderItemType } from '@shared/models/order-item.model';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(
    data: Pick<
      OrderType,
      'totalAmount' | 'receiver' | 'status' | 'userId' | 'feeShipping'
    >,
    tx: Prisma.TransactionClient,
  ): Promise<OrderType> {
    return tx.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        feeShipping: data.feeShipping,
        receiver: data.receiver,
        status: OrderStatusEnum.enum.PENDING,
      },
    });
  }

  async createOrderItem(
    data: Pick<OrderItemType, 'orderId' | 'price' | 'product' | 'quantity'>[],
    tx: Prisma.TransactionClient,
  ) {
    return tx.orderItem.createMany({
      data: data.map((item) => {
        return {
          orderId: item.orderId,
          quantity: item.quantity,
          price: item.price,
          product: item.product,
        };
      }),
    });
  }
}
