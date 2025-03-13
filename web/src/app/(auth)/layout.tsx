import Image from 'next/image';
import React from 'react';

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
        <article className="flex flex-col gap-4 w-3/4 mx-auto my-28">
          <h1 className="text-3xl">Welcome to my website</h1>
          {children}
        </article>
      </div>

      <div className="grow-[1] ">
        <Image src="/images/bg_auth.jpeg" alt="" fill />
      </div>
    </main>
  );
};

export default AuthLayout;
