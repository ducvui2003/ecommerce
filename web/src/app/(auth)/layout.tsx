import ClientIcon from '@/components/ClientIcon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-screen h-screen flex">
      <div className="relative flex-1 z-20 bg-pink-100 h-screen overflow-y-scroll scrollbar-hide">
        <article className="flex flex-col gap-4 w-3/4 mx-auto my-28">
          <h1 className="text-3xl">Welcome to my website</h1>
          {children}
        </article>
        <Link href={'/'} className="absolute top-5 left-5">
          <ClientIcon icon={'material-symbols-light:home-rounded'} size={24} />
        </Link>
      </div>

      <div className="grow-1 ">
        <Image src="/images/bg_auth.jpeg" alt="" fill />
      </div>
    </div>
  );
};

export default AuthLayout;
