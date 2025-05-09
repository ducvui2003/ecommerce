'use client';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import LogoutFrame from '@/components/LogoutFrame';
import GuestOnlyClient from '@/components/protected/GuestOnlyClient';
import RequiredAuthClient from '@/components/protected/RequiredAuthClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';

const UserDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ClientIcon
            icon={'lucide:user'}
            size={24}
            className="transition-opacity hover:cursor-pointer hover:opacity-50"
          />
        </DropdownMenuTrigger>
        <GuestOnlyClient>
          <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
            <DropdownMenuItem>
              <Link href={'/login'} className="flex-1">
                Đăng nhập
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/register'} className="flex-1">
                Đăng ký
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </GuestOnlyClient>
        {/* <RequiredAuthClient mode="hide"> */}
        <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
          <RequiredAuthClient mode="hide" role={['ADMIN']}>
            <DropdownMenuItem>
              <Link href={'/admin/product'} className="flex-1">
                Quản lý
              </Link>
            </DropdownMenuItem>
          </RequiredAuthClient>
          <DropdownMenuItem>
            <Link href={'/user/info'} className="flex-1" legacyBehavior>
              Thông tin cá nhân
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-1 bg-red-500 text-white hover:cursor-pointer hover:bg-red-700"
            onClick={() => setOpen(true)}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
        {/* </RequiredAuthClient> */}
      </DropdownMenu>
      <LogoutFrame open={open} setOpen={setOpen} />
    </>
  );
};

export default UserDropdown;
