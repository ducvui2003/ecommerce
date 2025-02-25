import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-[100px] overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="logo"
          fill
          className="scale-[1.75] object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
