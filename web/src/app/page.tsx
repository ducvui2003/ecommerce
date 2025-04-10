import React from 'react';
import SelectAddress from '@/components/address/SelectAddress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navigation, { components } from '@/components/Navigation';
import Banner from '@/components/home/Banner';

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto mb-11">
        <Navigation components={components} />
      </div>
      <Banner />
      <Footer />
    </>
  );
}
