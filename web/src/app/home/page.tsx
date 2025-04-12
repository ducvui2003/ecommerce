import Banner from '@/app/home/Banner';
import CollectionSection from '@/app/home/CollectionSection';
import FeatureSection from '@/app/home/FeatureSection';
import SellerSection from '@/app/home/SellerSection';
import StorySection from '@/app/home/StorySection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navigation, { components } from '@/components/Navigation';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <div className="sticky -top-3 left-0 right-0 z-50 shadow-xl bg-white">
        <Header />
        <div className="mx-auto pb-8">
          <Navigation components={components} />
        </div>
      </div>
      <Banner />
      <div className="mt-5">
        <CollectionSection />
      </div>
      <div>
        <StorySection />
      </div>
      <div className="mt-10">
        <FeatureSection />
      </div>
      <div className="mt-10">
        <SellerSection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
