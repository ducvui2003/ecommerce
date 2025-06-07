import React from 'react';
import HeaderWrapper from '@/components/HeaderWrapper';

const ContactLayout = ({
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

export default ContactLayout;
