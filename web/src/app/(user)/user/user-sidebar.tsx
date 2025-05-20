'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import React, { ReactElement } from 'react';
import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import Link from '@/components/Link';

const items: {
  title: string;
  url: string;
  icon: ReactElement;
}[] = [
  {
    title: 'Thông tin cá nhân',
    url: '/user/info',
    icon: <ClientIcon icon={'bx:sidebar'} />,
  },
  {
    title: 'Bảo mật',
    url: '/user/info',
    icon: <ClientIcon icon={'material-symbols:security'} />,
  },
  {
    title: 'Đơn hàng',
    url: '/user/info',
    icon: <ClientIcon icon={'material-symbols:box-outline'} />,
  },
];

const UserSidebar = () => {
  return (
    <Sidebar className="bg-white pb-[25px] shadow-2xl">
      <SidebarHeader className={'items-center'}>
        <Logo className={'size-[125px]'} />
      </SidebarHeader>
      <SidebarContent className={'my-5'}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={
              'mt-5 rounded-r-xl bg-[#CCE6FF] px-5 py-4 text-[#384D6C] hover:bg-[#EDF6FF]'
            }
          >
            <div className="flex w-full items-center gap-2">
              {item.icon}
              <span className={'flex justify-center text-[20px] font-medium'}>
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
export default UserSidebar;
