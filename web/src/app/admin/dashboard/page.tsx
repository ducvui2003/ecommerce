import OrderTrendChart from '@/app/admin/dashboard/order-trend-chart';
import RevenueChart from '@/app/admin/dashboard/revenue-chart';
import DashboardCard from '@/components/DashboardCard';
import BarChartRevenueRangeTime from '@/components/chart/BarChartRevenueRangeTime';
import DoughnutRevenueCategory from '@/components/chart/DoughnutRevenueCategory';
import { currency } from '@/lib/utils';
import dashboardService from '@/service/manager/dashboard-manager.server.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thống kê',
  description: 'Oil',
};

const DashboardPage = async () => {
  const data = await dashboardService.getDashboard();
  return (
    <section>
      <div className="mt-5 mb-4 flex gap-5">
        <DashboardCard icon={'fluent-mdl2:product-variant'}>
          <span>{data.stats.total.order} Đơn hàng</span>
        </DashboardCard>
        <DashboardCard icon={'gridicons:product'}>
          <span>{data.stats.total.product} Sản phẩm</span>
        </DashboardCard>
        <DashboardCard icon={'tdesign:money'}>
          <div className="flex flex-col">
            <span> Doanh thu: </span>
            <span>{currency(data.stats.total.revenue)}</span>
          </div>
        </DashboardCard>
        <DashboardCard icon={'mdi:user'}>
          <span>{data.stats.total.user} Khách hàng</span>
        </DashboardCard>
      </div>
      <RevenueChart revenueData={data.stats.revenueTrend} />
      <OrderTrendChart trendData={data.stats.orderTrendInWeekly} />
      <div className="[&>*]:border-accent flex gap-2 [&>*]:flex-1 [&>*]:rounded-md [&>*]:border-2 [&>*]:p-2">
        <DoughnutRevenueCategory />
        <BarChartRevenueRangeTime />
      </div>
    </section>
  );
};
export default DashboardPage;
