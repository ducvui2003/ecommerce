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

const RevenueByTimeRequestSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

const RevenueByTimeResponseSchema = z.array(
  z.object({
    month: z.string(),
    revenue: z.number(),
  }),
);

const RevenueByTimeAndCategoryResponseSchema = z.object({
  category: z.string(),
  revenue: z.number(),
});

const RevenueByTimeAndCategoryRequestSchema = z.object({
  month: z
    .string()
    .transform(Number)
    .refine((m) => m >= 1 && m <= 12, {
      message: 'Month must be between 1 and 12',
    }),
  year: z
    .string()
    .transform(Number)
    .refine((y) => y >= 2000 && y <= 2100, {
      message: 'Year must be a valid year',
    }),
});

type RevenueByTimeAndCategoryResponseType = z.infer<
  typeof RevenueByTimeAndCategoryResponseSchema
>;

type RevenueByTimeAndCategoryRequestType = z.infer<
  typeof RevenueByTimeAndCategoryRequestSchema
>;

type DashboardType = z.infer<typeof DashboardSchema>;

type RevenueByTimeResponseType = z.infer<typeof RevenueByTimeResponseSchema>;

type RevenueByTimeRequestType = z.infer<typeof RevenueByTimeRequestSchema>;

export {
  DashboardSchema,
  RevenueByTimeResponseSchema,
  RevenueByTimeRequestSchema,
  RevenueByTimeAndCategoryResponseSchema,
  RevenueByTimeAndCategoryRequestSchema,
};
export type {
  DashboardType,
  RevenueByTimeResponseType,
  RevenueByTimeRequestType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeAndCategoryRequestType,
};
