import Banner from '@/app/home/Banner';
import CollectionSection from '@/app/home/CollectionSection';
import FeatureSection from '@/app/home/FeatureSection';
import ReviewSection from '@/app/home/ReviewSection';
import SellerSection from '@/app/home/SellerSection';
import StorySection from '@/app/home/StorySection';
import StorySection2 from '@/app/home/StorySection2';
import VendorSection from '@/app/home/VendorSection';
import HeaderWrapper from '@/components/HeaderWrapper';

const HomePage = () => {
  return (
    <>
      <HeaderWrapper footer>
        <Banner />
        <div className="container mt-5">
          <CollectionSection />
        </div>
        <div className="mt-10">
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
          <div className="container">
            <ReviewSection />
          </div>
        </div>
        <div className="mt-10">
          <VendorSection />
        </div>
      </HeaderWrapper>
    </>
  );
};

export default HomePage;
