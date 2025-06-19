import DashboardPage from '@/app/admin/dashboard/page';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Thống kê',
  description: 'Oil',
};
const AdminPage = () => {
  return <DashboardPage />;
};

export default AdminPage;
