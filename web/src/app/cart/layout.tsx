import HeaderWrapper from '@/components/HeaderWrapper';
import React from 'react';

const CartLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderWrapper container>{children}</HeaderWrapper>
    </>
  );
};

export default CartLayout;