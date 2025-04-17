import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LogoutFrame from '@/components/LogoutFrame';
import Navigation, { components } from '@/components/Navigation';
import React, { ReactNode } from 'react';

type HeaderWrapperProp = {
  children?: ReactNode;
  enableFooter?: boolean;
};
const HeaderWrapper = ({
  children,
  enableFooter = false,
}: HeaderWrapperProp) => {
  return (
    <>
      <div className="sticky -top-2 right-0 left-0 z-50 bg-white shadow-xl">
        <Header />
        <div className="mx-auto pb-5">
          <Navigation components={components} />
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
};

export default HeaderWrapper;
