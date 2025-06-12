type DashboardResType = {
  stats: {
    total: {
      user: number;
      order: number;
      revenue: number;
      product: number;
    };
    revenueTrend: Array<{
      month: string;
      revenue: number;
    }>;
    orderTrendInWeekly: Array<{
      day: string;
      count: number;
    }>;
  };
};
export type { DashboardResType };
