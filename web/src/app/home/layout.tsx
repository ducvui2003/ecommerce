'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

type HomeLayoutProps = {
  children?: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const searchParams = useSearchParams();

  const googleStatus = searchParams.get('google');

  useEffect(() => {
    console.log(googleStatus);
    if (googleStatus == 'true') {
      toast.success('Đăng nhập với google thành công', {
        description: 'Chào mừng đến An Nhiên',
      });
    } else {
      toast.error('Đăng nhập với google thất bại');
    }
  }, [googleStatus]);

  return children;
};
export default HomeLayout;
