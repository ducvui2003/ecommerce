import { Injectable } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { OrderResType, SearchOrderType } from '@route/order/order.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderItemType } from '@shared/models/order-item.model';
import { OrderType } from '@shared/models/order.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface OrderRepository {
  createOrder(
    data: Pick<
      OrderType,
      'totalAmount' | 'receiver' | 'status' | 'userId' | 'feeShipping'
    >,
    tx: Prisma.TransactionClient,
  ): Promise<OrderType>;
  createOrderItem(
    data: Pick<OrderItemType, 'orderId' | 'price' | 'product' | 'quantity'>[],
    tx: Prisma.TransactionClient,
  );
  getDetail(userId: number, orderId: number): Promise<OrderType>;
  search(userId: number, dto: SearchOrderType): Promise<Paging<OrderResType>>;
}
@Injectable()
export class OrderPrismaRepository implements OrderRepository {
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
    const { page, size, sorts: sort, status } = dto;

    const whereRaw: Prisma.Sql[] = [Prisma.sql`o.user_id = ${userId}`];

    if (status) {
      whereRaw.push(Prisma.sql`o.status = ${status}::"OrderStatus"`);
    }

    const calculateOrderBy: Prisma.OrderOrderByWithRelationInput = {};
    const orderByRaw: Prisma.Sql[] = [];
    sort.forEach((item) => {
      if (item.sortBy === 'createdAt') {
        calculateOrderBy.createdAt = item.orderBy;
        orderByRaw.push(
          Prisma.sql`o.created_at ${Prisma.raw(item.orderBy.toUpperCase())}`,
        );
      }
      if (item.sortBy === 'price') {
        calculateOrderBy.totalAmount = item.orderBy;
        orderByRaw.push(
          Prisma.sql`o.total_amount ${Prisma.raw(item.orderBy.toUpperCase())}`,
        );
      }
    });
    const limit = size;
    const offset = (page - 1) * limit;

    const items = await this.prismaService.$queryRaw<OrderResType[]>(
      Prisma.sql`SELECT o.id, o.total_amount AS "totalAmount", o.status, o.created_at as "createdAt", SUM(oi.quantity)::INT as "quantity", first_item.product ->> 'media' AS "thumbnail"
                  FROM orders o JOIN order_items oi ON o.id = oi.order_id 
                  JOIN LATERAL (
                    SELECT oi2.product
                    FROM order_items oi2
                    WHERE oi2.order_id = o.id
                    ORDER BY oi2.created_at ASC
                    LIMIT 1
                  ) first_item ON true
                  WHERE ${Prisma.join(whereRaw, ' AND ')} 
                  GROUP BY o.id, o.total_amount, o.status, o.created_at, first_item.product 
                  ORDER BY ${Prisma.join(orderByRaw)}
                  LIMIT ${limit} OFFSET ${offset};`,
    );

    const resultCount = await this.prismaService.$queryRaw<{ count: number }>(
      Prisma.sql`SELECT COUNT(o.id)::INT as count
                  FROM orders o JOIN order_items oi ON o.id = oi.order_id 
                  JOIN LATERAL (
                    SELECT oi2.product
                    FROM order_items oi2
                    WHERE oi2.order_id = o.id
                    ORDER BY oi2.created_at ASC
                    LIMIT 1
                  ) first_item ON true
                  WHERE ${Prisma.join(whereRaw, ' AND ')};`,
    );

    const totalItems: number = resultCount?.[0]?.count ?? 0;

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
        payment: true,
      },
      where: {
        userId: userId,
        id: orderId,
      },
    });
  }
}
