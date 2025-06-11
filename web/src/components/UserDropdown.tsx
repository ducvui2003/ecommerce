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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-11 border border-gray-200 hover:cursor-pointer">
            <AvatarImage src="https://github.com" alt="@shadcn" />
            <AvatarFallback>
              <ClientIcon
                icon={'lucide:user'}
                size={22}
                className="transition-opacity hover:opacity-50"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
          <GuestOnlyClient>
            <DropdownMenuItem className="hover:!text-white">
              <Link href={'/login'} className="flex-1">
                Đăng nhập
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:!text-white">
              <Link href={'/register'} className="flex-1">
                Đăng ký
              </Link>
            </DropdownMenuItem>
          </GuestOnlyClient>
          <RequiredAuthClient mode="hide" role={['ADMIN']}>
            <DropdownMenuItem className="hover:!text-white">
              <Link href={'/admin/product'} className="flex-1">
                Quản lý
              </Link>
            </DropdownMenuItem>
          </RequiredAuthClient>
          <RequiredAuthClient mode="hide">
            <DropdownMenuItem className="hover:!text-white">
              <Link href={'/user/info'} className="flex-1" legacyBehavior>
                Thông tin cá nhân
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-destructive flex-1 text-white hover:cursor-pointer hover:!bg-red-700 hover:!text-white"
              onClick={() => setOpen(true)}
            >
              Đăng xuất
            </DropdownMenuItem>
          </RequiredAuthClient>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutFrame open={open} setOpen={setOpen} />
    </>
  );
};

export default UserDropdown;
