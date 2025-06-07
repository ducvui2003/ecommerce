import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  OrderDetailResType,
  OrderRepositoryType,
  SearchOrderType,
} from '@route/order/order-manager.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { OrderStatusType } from '@shared/constants/order.constant';
import { PaymentStatusType } from '@shared/constants/payment.constant';
import { OrderType } from '@shared/models/order.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface OrderManagerRepository {
  search(dto: SearchOrderType): Promise<Paging<OrderRepositoryType>>;
  getDetail(id: number): Promise<OrderType>;
  getCurrentStatus(id: number): Promise<{
    orderStatus: OrderStatusType;
    paymentStatus?: PaymentStatusType;
  }>;
  changeOrderStatus(id: number, status: OrderStatusType): Promise<void>;
}

@Injectable()
export class OrderManagerPrismaRepository implements OrderManagerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async search(dto: SearchOrderType): Promise<Paging<OrderRepositoryType>> {
    const {
      page,
      size,
      sorts,
      orderStatus,
      paymentStatus,
      nameUser,
      dateFrom,
      dateTo,
      id,
      nameReceiver,
      phoneReceiver,
    } = dto;

    const whereRaw: Prisma.Sql[] = [];
    if (id) {
      whereRaw.push(Prisma.sql`o.id = ${id}`);
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

    if (dateFrom) {
      whereRaw.push(Prisma.sql`o.created_at::date >= ${dateFrom}`);
    }
    if (dateTo) {
      whereRaw.push(Prisma.sql`o.created_at::date <= ${dateTo}`);
    }
    if (orderStatus.length) {
      whereRaw.push(
        Prisma.sql`o.status = ANY (${Prisma.sql`${orderStatus}`}::"OrderStatus"[])`,
      );
    }
    if (paymentStatus.length) {
      whereRaw.push(
        Prisma.sql`p.status = ANY (${Prisma.sql`${paymentStatus}`}::"PaymentStatus"[])`,
      );
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

    const items = await this.prismaService.$queryRaw<OrderRepositoryType[]>(
      Prisma.sql`SELECT o.id, 
                  o.total_amount AS "totalAmount", 
                  o.status, o.created_at as "createdAt", 
                  SUM(oi.quantity)::INT as "quantity",
                  o.receiver ->> 'name' as "receiverName",
                  o.receiver ->> 'phone' as "receiverPhone",
                  o.receiver ->> 'email' as "receiverEmail",
                  p.id AS "paymentId",
                  p.provider AS "paymentProvider",
                  p.status AS "paymentStatus",
                  p.created_at as "paymentCreatedAt" 
                  FROM orders o JOIN order_items oi ON o.id = oi.order_id 
                  JOIN payment p ON p.order_id = o.id 
                  JOIN users u ON o.user_id = u.id 
                  ${whereRaw.length ? Prisma.sql`WHERE ${Prisma.join(whereRaw, ' AND ')}` : Prisma.empty}
                  GROUP BY o.id, o.total_amount, o.status, o.created_at, p.id, p.provider, p.status, p.created_at 
                  LIMIT ${limit} OFFSET ${offset};`,
    );

    const resultCount = await this.prismaService.$queryRaw<{ count: number }>(
      Prisma.sql`SELECT COUNT(DISTINCT o. id)::INT as count
                FROM orders o JOIN order_items oi ON o.id = oi.order_id 
                JOIN payment p ON p.order_id = o.id 
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

  getDetail(id: number): Promise<OrderType> {
    return this.prismaService.order.findFirstOrThrow({
      include: {
        orderItem: true,
        payment: true,
        user: true,
      },
      where: {
        id: id,
      },
    });
  }

  async getCurrentStatus(id: number): Promise<{
    orderStatus: OrderStatusType;
    paymentStatus?: PaymentStatusType;
  }> {
    const data = await this.prismaService.order.findUniqueOrThrow({
      select: {
        status: true,
        payment: {
          select: {
            status: true,
          },
        },
      },
      where: {
        id: id,
      },
    });

    return {
      orderStatus: data.status,
      paymentStatus: data?.payment?.status,
    };
  }
  async changeOrderStatus(id: number, status: OrderStatusType): Promise<void> {
    await this.prismaService.order.update({
      where: { id },
      data: { status },
    });
    return Promise.resolve();
  }
}
