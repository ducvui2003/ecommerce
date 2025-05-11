'use client';
import SessionRestoreProvider from '@/app/provider/SessionRestoreProvider';
import StoreProvider from '@/app/provider/StoreProvinder';
import { Toaster } from '@/components/ui/sonner';

import { LOCAL_STORAGE } from '@/constraint/variable';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

type ProvidersProps = {
  accessToken?: string;
  children: React.ReactNode;
};

const Providers = ({ children, accessToken }: ProvidersProps) => {
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
      <SessionRestoreProvider accessToken={accessToken}>
        <main className="relative">
          <Toaster position="bottom-right" richColors />
          {children}
        </main>
      </SessionRestoreProvider>
    </StoreProvider>
  );
};

export default Providers;
