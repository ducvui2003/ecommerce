'use client';
import UserBreadcrumb from '@/app/(user)/user/user-breadcrumb';
import UserSidebar from '@/app/(user)/user/user-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="flex w-full flex-col">
        <UserBreadcrumb />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserLayout;
