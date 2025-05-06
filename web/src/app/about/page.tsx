import HeroBar from '@/app/about/HeroBar';
import WhyChooseUs from '@/app/about/WhyChooseUs';
import CoreValuesSection from '@/app/about/CoreValuesSection';
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