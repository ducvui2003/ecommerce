import { DataTable } from '@/app/admin/user/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage User',
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
