import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ClientIcon
          icon={'lucide:user'}
          size={24}
          className="hover:cursor-pointer hover:opacity-50 transition-opacity"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
        <DropdownMenuCheckboxItem>
          <Link href={'/login'}>Đăng nhập</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          <Link href={'/register'}>Đăng ký</Link>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
