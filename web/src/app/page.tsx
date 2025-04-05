import React from 'react';
import SelectAddress from '@/components/address/SelectAddress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <SelectAddress />
      <Footer />
    </>
  );
}
