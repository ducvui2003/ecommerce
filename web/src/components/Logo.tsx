import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="relative size-[100px] overflow-hidden">
      <Image
        src="/images/logo.png"
        alt="logo"
        fill
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
