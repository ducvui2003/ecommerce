'use client';
import StoreProvider from '@/app/provider/StoreProvinder';
import { Toaster } from '@/components/ui/toaster';
import { LOCAL_STORAGE } from '@/constraint/variable';
import { useToast } from '@/hooks/use-toast';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  useEffect(() => {
    const message = localStorage.getItem(LOCAL_STORAGE.LOGOUT);
    if (message) {
      toast.toast({
        title: 'Đăng xuất thành công ',
        variant: 'destructive',
        duration: 2000,
      });
      localStorage.removeItem(LOCAL_STORAGE.LOGOUT);
    }
  }, []);
  return (
    <StoreProvider>
      <SessionProvider>
        <main className="relative">
          <Toaster />
          {children}
        </main>
      </SessionProvider>
    </StoreProvider>
  );
};

export default Providers;
