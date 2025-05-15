import { DataTable } from '@/app/admin/product/data-table';

const ProductAdminPage = () => {
  return (
    <div>
      <div className="bg-secondary mb-4 rounded-xl px-4 py-2">
        <h2>Quản lý sản phẩm</h2>
      </div>
      <DataTable />
    </div>
  );
};

export default ProductAdminPage;
