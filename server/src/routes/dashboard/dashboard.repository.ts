import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  DashboardType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeResponseType,
} from '@route/dashboard/dashboard.schema';
import { PrismaService } from '@shared/services/prisma.service';

export interface DashboardRepository {
  getDashboard(): Promise<DashboardType>;

  getRevenueByTime(from: Date, to: Date): Promise<RevenueByTimeResponseType>;

  getRevenueByTimeAndCategory(
    from: Date,
  ): Promise<RevenueByTimeAndCategoryResponseType>;
}
@Injectable()
export class PrismaDashboardRepository implements DashboardRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getDashboard(): Promise<DashboardType> {
    const totalUser = await this.prismaService.user.count();
    const totalOrder = await this.prismaService.$queryRaw<
      {
        status: string;
        quantity: number;
      }[]
    >(Prisma.sql`
        SELECT o.status, count (*)::INT as "quantity" FROM orders o
        GROUP BY o.status;
      `);
    const totalProduct = await this.prismaService.product.count();
    const totalRevenue = await this.prismaService.$queryRaw<
      { revenue: number | null }[]
    >(Prisma.sql`
        SELECT SUM(o.total_amount + o.fee_shipping)::INT as revenue FROM orders o;
        `);
    const revenueTrend = await this.prismaService.$queryRaw<
      { month: string; revenue: number }[]
    >(Prisma.sql`
          WITH months AS (
            SELECT to_char(d, 'YYYY-MM') AS month
            FROM generate_series (
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + interval '11 months',
            interval '1 month'
            ) d
        )
        SELECT 
            m.month,
            COALESCE(SUM(o.total_amount + o.fee_shipping), 0) AS revenue
        FROM months m
        LEFT JOIN orders o
            ON to_char(o.created_at, 'YYYY-MM') = m.month
        GROUP BY m.month
        ORDER BY m.month;
        `);
    const orderTrendInWeekly = await this.prismaService.$queryRaw<
      { day: string; orderCount: number }[]
    >(Prisma.sql`
         WITH days AS (
            SELECT to_char(d, 'YYYY-MM-DD') AS day
            FROM generate_series(
            date_trunc('week', CURRENT_DATE),
            date_trunc('week', CURRENT_DATE) + interval '6 days',
            interval '1 day'
            ) d
        )
        SELECT 
            days.day,
            COUNT(o.id)::INT AS count
        FROM days
        LEFT JOIN orders o
            ON to_char(o.created_at, 'YYYY-MM-DD') = days.day
        GROUP BY days.day
        ORDER BY days.day;
        `);
    const response: DashboardType = {
      stats: {
        total: {
          order: totalOrder.reduce(
            (acc, item) => {
              acc[item.status] = item.quantity;
              return acc;
            },
            {} as Record<string, number>,
          ),
          user: totalUser,
          product: totalProduct,
          revenue: totalRevenue?.[0].revenue ?? 0,
        },
        orderTrendInWeekly: orderTrendInWeekly,
        revenueTrend: revenueTrend,
      },
    };

    return response;
  }

  async getRevenueByTime(
    from: Date,
    to: Date,
  ): Promise<RevenueByTimeResponseType> {
    const revenueTrend = await this.prismaService
      .$queryRaw<RevenueByTimeResponseType>(Prisma.sql`
           WITH months AS (
              SELECT to_char(d, 'YYYY-MM') AS month
              FROM generate_series (
                ${from}::date,
                ${to}::date,
                interval '1 month'
              ) d
            )
            SELECT 
              m.month,
              COALESCE(SUM(o.total_amount + o.fee_shipping), 0) AS revenue
            FROM months m
            LEFT JOIN orders o
              ON to_char(o.created_at, 'YYYY-MM') = m.month
              AND o.created_at BETWEEN ${from} AND ${to}
            GROUP BY m.month
            ORDER BY m.month;
        `);
    return revenueTrend;
  }

  getRevenueByTimeAndCategory(
    from: Date,
  ): Promise<RevenueByTimeAndCategoryResponseType> {
    return this.prismaService.$queryRaw<RevenueByTimeAndCategoryResponseType>(
      Prisma.sql`
        SELECT 
          product->>'category' AS category,
          SUM(
            (product->>'price')::numeric + 
            COALESCE((product->'options'->>'price')::numeric, 0)
          ) AS revenue
        FROM order_items
        WHERE EXTRACT(MONTH FROM created_at) = ${from.getMonth() + 1}
          AND EXTRACT(YEAR FROM created_at) = ${from.getFullYear()}
        GROUP BY category
        ORDER BY revenue DESC;
  `,
    );
  }
}
