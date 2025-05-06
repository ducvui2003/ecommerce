import { columns, Payment } from '@/app/admin/user/column';
import { DataTable } from '@/app/admin/user/data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage User',
  description: 'Oil',
};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

const UserAdminPage = async () => {
  const data = await getData();
  return (
    <div>
      Quan ly nguoi dung
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserAdminPage;
