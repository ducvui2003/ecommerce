'use client';
import StoreProvider from '@/app/provider/StoreProvinder';
import { Toaster } from '@/components/ui/sonner';

import { LOCAL_STORAGE } from '@/constraint/variable';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const message = localStorage.getItem(LOCAL_STORAGE.LOGOUT);
    if (message) {
      toast.success('Đăng xuất thành công', {
        duration: 2000,
      });
      localStorage.removeItem(LOCAL_STORAGE.LOGOUT);
    }
  }, []);
  return (
    <StoreProvider>
      <SessionProvider>
        <main className="relative">
          <Toaster position="bottom-right" richColors />
          {children}
        </main>
      </SessionProvider>
    </StoreProvider>
  );
};

export default Providers;
