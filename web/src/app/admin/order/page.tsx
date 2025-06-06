import { DataTable } from '@/app/admin/order/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ' Quản lý đơn hàng',
  description: 'Oil',
};

const OrderAdminPage = () => {
  return (
    <section>
      <h2>Quan ly don hang</h2>
      <DataTable />
    </section>
  );
};

export default OrderAdminPage;
