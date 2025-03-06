'use client';
import { Button } from '@/components/ui/button';
import { HOME_PAGE } from '@/constraint/variable';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut({ redirect: false });
      }}
    >
      Đăng xuất
    </Button>
  );
};

export default LogoutButton;
