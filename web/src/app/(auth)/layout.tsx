import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { redirect } from 'next/navigation';

import Image from 'next/image';
import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative w-screen h-screen bg-gray-100">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20 z-10" />
      <div className="absolute inset-0 -z-0">
        <Image src="/images/bg_auth.jpeg" alt="" fill />
      </div>
      <Link href="/" className="absolute top-4 left-4 z-20">
        <ClientIcon icon="akar-icons:home" size={40} />
      </Link>

      <div className="w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-pink-100 p-4 rounded-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
