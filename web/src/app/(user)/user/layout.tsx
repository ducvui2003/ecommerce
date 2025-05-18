'use client';
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import UserSidebar from '@/app/(user)/user/user-sidebar';
import { usePathname } from 'next/navigation';
import UserBreadcrumb from '@/app/(user)/user/user-breadcrumb';

const UserLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider>
      <UserSidebar/>
      <main className="flex flex-col w-full">
        <UserBreadcrumb />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserLayout;
