'use client';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import LogoutFrame from '@/components/LogoutFrame';
import GuestOnlyClient from '@/components/protected/GuestOnlyClient';
import RequiredAuthClient from '@/components/protected/RequiredAuthClient';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
              <Link href={'/login'} className="w-full">
                Đăng nhập
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/register'} className="w-full">
                Đăng ký
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </GuestOnlyClient>
        <RequiredAuthClient mode="hide">
          <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
            <DropdownMenuItem
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={() => setOpen(true)}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </RequiredAuthClient>
      </DropdownMenu>
      <LogoutFrame open={open} setOpen={setOpen} />
    </>
  );
};

export default UserDropdown;
