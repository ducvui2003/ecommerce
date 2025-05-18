import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navigation, { components } from '@/components/Navigation';
import React, { ReactNode } from 'react';

type HeaderWrapperProp = {
  children?: ReactNode;
  footer?: boolean;
  container?: boolean;
};
const HeaderWrapper = ({
  children,
  footer: enableFooter = false,
  container = false,
}: HeaderWrapperProp) => {
  return (
    <>
      <div className="sticky -top-2 right-0 left-0 z-50 bg-white shadow-xl">
        <Header />
        <div className="mx-auto pt-2 pb-5">
          <Navigation components={components} />
        </div>
      </div>
      {container ? <div className="container">{children}</div> : children}
      {enableFooter && <Footer />}
    </>
  );
};

export default HeaderWrapper;
