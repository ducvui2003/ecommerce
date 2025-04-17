import ClientIcon from '@/components/ClientIcon';
import Link from 'next/link';
import React from 'react';
import Logo from '@/components/Logo';
import { HOME_PAGE } from '@/constraint/variable';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative flex h-screen w-screen">
      <div className="absolute inset-0 bg-[url(/images/bg_auth.png)] bg-cover bg-center bg-no-repeat blur-sm"></div>
      <div className="scrollbar-hide absolute top-1/2 left-1/2 min-w-2/7 -translate-1/2 overflow-y-scroll">
        <article className="flex flex-col gap-4 rounded-xl bg-white px-5 py-2.5">
          {children}
        </article>
        {/* <Link href={HOME_PAGE} className="top-5 left-5">
          <ClientIcon icon={'material-symbols-light:home-rounded'} size={24} />
        </Link> */}
      </div>
    </div>
  );
};

export default AuthLayout;
