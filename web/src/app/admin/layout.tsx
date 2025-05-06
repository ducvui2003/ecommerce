import Link from '@/components/Link';
import nextAuthConfig from '@/config/auth.config';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import avatar from 'public/images/logo-transparent.png';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(nextAuthConfig);
  const classLink =
    'border-accent rounded-md border bg-white p-4 block text-md';
  return (
    <main>
      <div className="grid grid-cols-12 gap-1">
        <aside className="bg-secondary col-span-3 my-2 ml-2 h-[calc(100vh-16px)] rounded-md px-4 py-2 shadow">
          <article
            className={
              (cn(classLink),
              'bg-primary flex items-center gap-2 rounded-[inherit] px-4 py-2')
            }
          >
            <Image src={avatar} className="size-[80px] rounded-full" alt="" />
            <div>
              <h1>Xin chào, {session?.user.name ?? ''}</h1>
              <span className="pt-2">{session?.user.role ?? ''}</span>
            </div>
          </article>
          <ul className="[&>*]:mt-2">
            <li>
              <Link href={'/admin'} className={cn(classLink)}>
                Trang tổng quan
              </Link>
            </li>
            <li>
              <Link href={'/admin/product'} className={cn(classLink)}>
                Quản lý sản phẩm
              </Link>
            </li>
            <li>
              <Link href={'/admin/order'} className={cn(classLink)}>
                Quản lý đơn hàng
              </Link>
            </li>
            <li>
              <Link href={'/admin/user'} className={cn(classLink)}>
                Quản lý người dùng
              </Link>
            </li>
          </ul>
        </aside>
        <section className="col-span-9 container mt-2">{children}</section>
      </div>
    </main>
  );
};

export default AdminLayout;
