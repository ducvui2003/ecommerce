import HeaderWrapper from '@/components/HeaderWrapper';
import React from 'react';

const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderWrapper footer container>
        {children}
      </HeaderWrapper>
    </>
  );
};

export default ProductLayout;
