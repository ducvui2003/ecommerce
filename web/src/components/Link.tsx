import React from 'react';
import { default as NextLink } from 'next/link';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;

const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <NextLink href={href} passHref {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
