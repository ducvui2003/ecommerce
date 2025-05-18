import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { ComponentProps } from 'react';
import image from '/public/images/logo-transparent.png';

type LogoProps = ComponentProps<'a'>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn('relative block size-[100px] overflow-hidden', className)}
    >
      <Image src={image} alt="logo" fill className="object-contain" />
    </Link>
  );
};

export default Logo;
