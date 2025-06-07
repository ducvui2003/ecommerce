import { DataTable } from '@/app/admin/order/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý đơn hàng',
  description: 'Oil',
};

const OrderAdminPage = () => {
  return (
    <section>
      <DataTable />
    </section>
  );
};

export default OrderAdminPage;
