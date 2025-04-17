import React from 'react';
import { default as NextLink } from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type LinkProps = ComponentProps<typeof NextLink>;

const Link = ({ href, children, className, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      passHref
      {...props}
      className={cn('hover:cursor-pointer', className)}
    >
      {children}
    </NextLink>
  );
};

export default Link;
