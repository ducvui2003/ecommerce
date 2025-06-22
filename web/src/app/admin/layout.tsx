import ClientIcon from '@/components/ClientIcon';
import HeaderManager from '@/components/HeaderManager';
import Link from '@/components/Link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const classLink =
    'border-accent rounded-md border bg-white p-4 block text-md flex items-center gap-2 text-xl';
  return (
    <>
      <HeaderManager />
      <div className="grid grid-cols-13 gap-4">
        <aside className="bg-secondary col-span-3 px-4 py-2 shadow">
          <ul className="[&>*]:mt-2">
            <li>
              <Link
                href={'/admin'}
                className={cn(classLink)}
                activeClassName="bg-primary"
                exec
              >
                <ClientIcon icon={'file-icons:dashboard'} size={24} />
                Trang tổng quan
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/product'}
                className={cn(classLink)}
                activeClassName="bg-primary"
              >
                <ClientIcon icon={'gridicons:product'} size={24} />
                Quản lý sản phẩm
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/order'}
                className={cn(classLink)}
                activeClassName="bg-primary"
              >
                <ClientIcon icon={'lets-icons:order'} size={24} />
                Quản lý đơn hàng
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/user'}
                className={cn(classLink)}
                activeClassName="bg-primary"
              >
                <ClientIcon icon={'garden:customer-lists-fill-26'} size={24} />
                Quản lý người dùng
              </Link>
            </li>
          </ul>
        </aside>
        <section className="col-span-10 my-2 mr-2">
          <ScrollArea className="relative h-[calc(100vh-100px)] overflow-hidden">
            {children}
          </ScrollArea>
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
