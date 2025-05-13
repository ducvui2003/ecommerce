import getServerSession from '@/components/auth/getServerSession';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import avatar from 'public/images/logo-transparent.png';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const classLink =
    'border-accent rounded-md border bg-white p-4 block text-md flex items-center gap-2 text-xl';
  return (
    <div className="grid grid-cols-13 gap-4">
      <aside className="bg-secondary col-span-3 my-2 ml-2 h-[calc(100vh-16px)] rounded-md px-4 py-2 shadow">
        <article
          className={
            (cn(classLink),
            'bg-primary flex items-center gap-2 rounded-[inherit] px-4 py-2')
          }
        >
          <Image src={avatar} className="size-[40px] rounded-full" alt="" />
          <div>
            <h1>Xin chào, {session?.user.name ?? ''}</h1>
            <span className="pt-2">{session?.user.role ?? ''}</span>
          </div>
        </article>
        <ul className="[&>*]:mt-2">
          <li>
            <Link href={'/admin'} className={cn(classLink)}>
              <ClientIcon icon={'file-icons:dashboard'} size={24} />
              Trang tổng quan
            </Link>
          </li>
          <li>
            <Link href={'/admin/product'} className={cn(classLink)}>
              <ClientIcon icon={'gridicons:product'} size={24} />
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link href={'/admin/order'} className={cn(classLink)}>
              <ClientIcon icon={'lets-icons:order'} size={24} />
              Quản lý đơn hàng
            </Link>
          </li>
          <li>
            <Link href={'/admin/user'} className={cn(classLink)}>
              <ClientIcon icon={'garden:customer-lists-fill-26'} size={24} />
              Quản lý người dùng
            </Link>
          </li>
        </ul>
      </aside>
      <section className="col-span-10 mt-2 mr-2">{children}</section>
    </div>
  );
};

export default AdminLayout;
