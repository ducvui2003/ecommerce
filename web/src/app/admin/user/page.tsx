import { DataTable } from '@/app/admin/user/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý người dùng',
  description: 'Oil',
};

const UserAdminPage = async () => {
  return (
    <div>
      <DataTable />
    </div>
  );
};

export default UserAdminPage;
