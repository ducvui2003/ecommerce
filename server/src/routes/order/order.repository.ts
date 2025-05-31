import { PrismaService } from '@shared/services/prisma.service';
import { OrderType } from '@shared/models/order.model';
import { Order, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { OrderItemType } from '@shared/models/order-item.model';
import { OrderStatus } from '@shared/constants/order.constant';
import { OrderResType, SearchOrderType } from '@route/order/order.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';

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
        status: OrderStatus.PENDING,
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

  async search(
    userId: number,
    dto: SearchOrderType,
  ): Promise<Paging<OrderResType>> {
    const { page, size } = dto;

    const whereClause: Prisma.OrderWhereInput = {};
    const [totalItems, items] = await this.prismaService.$transaction([
      this.prismaService.order.count({ where: whereClause }),
      this.prismaService.$queryRaw<OrderResType[]>(
        Prisma.sql`SELECT o.id, o.total_amount AS "totalAmount", o.status, o.created_at as "createdAt", COUNT(oi.id)::INT as "quantity", first_item.product ->> 'media' AS "thumbnail"
                  FROM orders o JOIN order_items oi ON o.id = oi.order_id 
                  JOIN LATERAL (
                    SELECT oi2.product
                    FROM order_items oi2
                    WHERE oi2.order_id = o.id
                    ORDER BY oi2.created_at ASC
                    LIMIT 1
                  ) first_item ON true
                  WHERE user_id = ${userId} 
                  GROUP BY o.id, o.total_amount, o.status, o.created_at, first_item.product 
                  LIMIT ${size} OFFSET ${page * size};`,
      ),
    ]);

    return {
      items,
      pagination: {
        page,
        limit: size,
        totalPages: Math.ceil(totalItems / size),
        totalItems,
      },
    };
  }
  async getDetail(userId: number, orderId: number): Promise<OrderType> {
    return this.prismaService.order.findFirstOrThrow({
      include: {
        orderItem: true,
      },
      where: {
        userId: userId,
        id: orderId,
      },
    });
  }
}
