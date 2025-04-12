import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import image from '/public/images/story_section.png';
import { ALT } from '@/constraint/variable';

const StorySection = () => {
  return (
    <section className="h-screen overflow-hidden bg-[#FFF5EA]">
      <div className="container flex py-12 gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl;">Lorem ipsum dolor sit amet</h2>
          <p className="pt-2 pb-4 text-xl">
            Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
            gravida orci, fringilla a. Ac sed eu fringilla odio mi. Consequat
            pharetra at magna imperdiet cursus ac faucibus sit libero. Ultricies
            quam nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis
            donec dolor id in. Pulvinar commodo mollis diam sed facilisis at
            cursus imperdiet cursus ac faucibus sit faucibus sit libero.
          </p>
          <div>
            <Button>Xem thêm</Button>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src={image}
            alt={ALT}
            className="object-cover w-full rounded-md h-[calc(100vh-100px)]"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
