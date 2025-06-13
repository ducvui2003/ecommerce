import { number, z } from 'zod';

const DashboardSchema = z.object({
  stats: z.object({
    total: z.object({
      user: z.number().int(),
      order: z.number().int(),
      revenue: z.number().int(),
      product: z.number().int(),
    }),
    revenueTrend: z.array(
      z.object({
        month: z.string(),
        revenue: z.number(),
      }),
    ),
    orderTrendInWeekly: z.array(
      z.object({
        day: z.string(),
        orderCount: z.number().int(),
      }),
    ),
  }),
});

type DashboardType = z.infer<typeof DashboardSchema>;
export { DashboardSchema };
export type { DashboardType };
