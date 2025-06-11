import HeroBar from '@/app/about-us/HeroBar';
import WhyChooseUs from '@/app/about-us/WhyChooseUs';
import CoreValuesSection from '@/app/about-us/CoreValuesSection';
import HeaderWrapper from '@/components/HeaderWrapper';
import Testimonials from './Testimonials';

function Page() {
  return (
    <div>
      <HeaderWrapper footer>
        <HeroBar />
        <WhyChooseUs />
        <Testimonials />
        <CoreValuesSection />
      </HeaderWrapper>
    </div>
  );
}

export default Page;