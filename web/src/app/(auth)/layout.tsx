import ClientIcon from '@/components/ClientIcon';
import GoogleButton from '@/components/oauth2/GoogleButton';
import Link from '@/components/Link';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import FacebookButton from '@/components/oauth2/FacebookButton';

const AuthLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug?: string };
}>) => {
  return (
    <main className="w-screen h-screen bg-gray-100 flex">
      <div className=" relative flex-1 z-20 bg-pink-100 h-screen overflow-y-scroll scrollbar-hide">
        <article className="flex flex-col gap-4 w-3/4 mx-auto mt-28">
          <h1 className="text-3xl">Welcome to my website</h1>

          <div className="p-2 ">{children}</div>

          <div className="p-2 ">
            <span className="text-center block py-2">Hoặc đăng nhập với</span>
            <div className="flex justify-evenly      ">
              <GoogleButton />
              <FacebookButton />
              {/* <ClientIcon icon="logos:facebook" size={40} /> */}
            </div>
          </div>
        </article>
      </div>

      <div className="grow-[1] ">
        <Image src="/images/bg_auth.jpeg" alt="" fill />
      </div>
    </main>
  );
};

export default AuthLayout;
