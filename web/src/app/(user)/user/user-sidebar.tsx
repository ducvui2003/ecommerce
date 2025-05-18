'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import React from 'react';
import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';

const UserSidebar = () => {
  const items = [
    {
      title: 'Trang chủ',
      url: '/user/info',
      icon: 'bx:sidebar',
    },
  ];

  return (
    <Sidebar className="bg-white pb-[25px] shadow-2xl">
      <SidebarHeader className={'items-center'}>
        <Logo className={'size-[125px]'} />
      </SidebarHeader>
      <SidebarContent className={'my-5'}>
        {items.map((item) => (
          <a
            href={item.url}
            className={
              'mt-5 rounded-r-xl bg-[#CCE6FF] px-5 py-4 text-[#384D6C] hover:bg-[#EDF6FF]'
            }
          >
            <div className={'flex w-full justify-center'}>
              <ClientIcon icon={item.icon} size={30} className={'mr-2'} />
              <span className={'flex justify-center text-[20px] font-medium'}>
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
export default UserSidebar;
