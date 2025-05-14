'use client';
import { LOCAL_STORAGE } from '@/constraint/variable';
import { setAccessToken } from '@/lib/http.client';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

type ClientProviderProps = {
  accessToken: string;
  children?: ReactNode;
};

const ClientProvider = ({ accessToken, children }: ClientProviderProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
    setIsReady(true);
  }, [accessToken]);

  useEffect(() => {
    const message = localStorage.getItem(LOCAL_STORAGE.LOGOUT);
    if (message) {
      toast.success('Đăng xuất thành công', {
        duration: 2000,
      });
      localStorage.removeItem(LOCAL_STORAGE.LOGOUT);
    }
  }, []);

  if (!isReady) return null;
  return <>{children}</>;
};

export default ClientProvider;
