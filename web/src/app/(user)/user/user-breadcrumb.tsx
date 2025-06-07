'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { useState } from 'react';
import LogoutFrame from '@/components/LogoutFrame';
import { Button } from '@/components/ui/button';

const pathMap: Record<string, string> = {
  'user/info': 'Cài đặt/Thông tin cá nhân',
  'user/security': 'Cài đặt/Bảo mật',
  'user/order': 'Cài đặt/Đơn hàng',
};

const UserBreadcrumb = () => {
  const pathname = usePathname(); // e.g., "/user/info"
  const normalizedPath = pathname.replace(/^\/+/, ''); // "user/info"
  const [open, setOpen] = useState<boolean>(false);
  const custom = pathMap[normalizedPath];
  const segments = custom
    ? custom.split('/')
    : normalizedPath.split('/').map((segment) => decodeURIComponent(segment));

  const links = normalizedPath.split('/'); // Optional: format nicely
  return (
    <div
      className={
        'z-10 flex max-h-1/12 w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2'
      }
    >
      <Breadcrumb>
        <BreadcrumbList className="ml-3">
          {segments.map((segment, index) => {
            const href = '/' + links.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;

            return (
              <React.Fragment key={href}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className={`text-[15px] ${isLast ? 'font-semibold' : 'font-normal'}`}
                  >
                    <Link href={href}>{segment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        className={
          'bg-primary hover:bg-secondary mr-3 cursor-pointer rounded-xl p-3 text-[16px] text-white'
        }
        onClick={() => setOpen(true)}
      >
        Đăng xuất
      </Button>
      <LogoutFrame open={open} setOpen={setOpen} />
    </div>
  );
};
export default UserBreadcrumb;
