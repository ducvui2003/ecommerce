import { DataTable } from '@/app/admin/product/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ' Quản lý sản phẩm',
  description: 'Oil',
};

const ProductAdminPage = () => {
  return (
    <div>
      <DataTable />
    </div>
  );
};

export default ProductAdminPage;
