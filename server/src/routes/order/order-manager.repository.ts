import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SearchOrderType } from '@route/order/order-manager.schema';
import { OrderResType } from '@route/order/order.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { PrismaService } from '@shared/services/prisma.service';

export interface OrderManagerRepository {
  search(dto: SearchOrderType): Promise<Paging<OrderResType>>;
}

@Injectable()
export class OrderManagerPrismaRepository implements OrderManagerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async search(dto: SearchOrderType): Promise<Paging<OrderResType>> {
    const {
      page,
      size,
      sorts,
      status,
      nameUser,
      date,
      id,
      nameReceiver,
      phoneReceiver,
    } = dto;

    const whereRaw: Prisma.Sql[] = [];
    if (id) {
      whereRaw.push(Prisma.sql`u.id = ${id}`);
    }
    if (nameUser) {
      whereRaw.push(Prisma.sql`u.name = ${nameUser}`);
    }
    if (nameReceiver) {
      whereRaw.push(Prisma.sql`o.receiver ->> "name" ILIKE ${nameReceiver}`);
    }
    if (phoneReceiver) {
      whereRaw.push(Prisma.sql`o.receiver ->> "phone" ILIKE ${phoneReceiver}`);
    }
    if (date) {
      const { from, to } = date;
      if (from) {
        whereRaw.push(Prisma.sql`o.created_at::date >= ${from}`);
      }
      if (to) {
        whereRaw.push(Prisma.sql`o.created_at::date <= ${to}`);
      }
    }
    if (status) {
      whereRaw.push(Prisma.sql`o.status = ${status}::"OrderStatus"`);
    }

    const calculateOrderBy: Prisma.OrderOrderByWithRelationInput = {};
    const orderByRaw: Prisma.Sql[] = [];

    sorts.forEach((item) => {
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
                    JOIN users u ON o.user_id = u.id 
                    ${whereRaw.length ? Prisma.sql`WHERE ${Prisma.join(whereRaw, ' AND ')}` : Prisma.empty}
                    GROUP BY o.id, o.total_amount, o.status, o.created_at, first_item.product 
                    ${orderByRaw.length ? Prisma.sql`ORDER BY ${Prisma.join(orderByRaw)}` : Prisma.empty}
                    LIMIT ${limit} OFFSET ${offset};`,
    );

    const resultCount = await this.prismaService.$queryRaw<{ count: number }>(
      Prisma.sql`SELECT COUNT(DISTINCT o.id)::INT as count
                FROM orders o
                JOIN order_items oi ON o.id = oi.order_id 
                JOIN LATERAL (
                SELECT oi2.product
                FROM order_items oi2
                WHERE oi2.order_id = o.id
                ORDER BY oi2.created_at ASC
                LIMIT 1
                ) first_item ON true
                JOIN users u ON o.user_id = u.id 
                ${whereRaw.length ? Prisma.sql`WHERE ${Prisma.join(whereRaw, ' AND ')}` : Prisma.empty}
            `,
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
}
