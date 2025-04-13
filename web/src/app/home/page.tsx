import Banner from '@/app/home/Banner';
import CollectionSection from '@/app/home/CollectionSection';
import FeatureSection from '@/app/home/FeatureSection';
import ReviewSection from '@/app/home/ReviewSection';
import SellerSection from '@/app/home/SellerSection';
import StorySection from '@/app/home/StorySection';
import StorySection2 from '@/app/home/StorySection2';
import VendorSection from '@/app/home/VendorSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navigation, { components } from '@/components/Navigation';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <div className="sticky -top-2 left-0 right-0 z-50 bg-white shadow-xl">
        <Header />
        <div className="mx-auto pb-5">
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
      <div className="container mt-10">
        <StorySection2 />
      </div>
      <div className="mt-10">
        <ReviewSection />
      </div>
      <div className="mt-10">
        <VendorSection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
