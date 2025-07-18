import HeaderWrapper from '@/components/HeaderWrapper';
import React from 'react';

const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderWrapper container footer>
        {children}
      </HeaderWrapper>
    </>
  );
};

export default ProductLayout;
