import { DataTable } from '@/app/admin/user/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage User',
  description: 'Oil',
};

const UserAdminPage = async () => {
  return (
    <div>
      <div className="bg-secondary mb-4 rounded-xl px-4 py-2">
        <h2>Quản lý người dùng</h2>
      </div>
      <DataTable />
    </div>
  );
};

export default UserAdminPage;
