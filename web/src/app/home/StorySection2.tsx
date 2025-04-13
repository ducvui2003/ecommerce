import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import image from '/public/images/story_section_2.png';
import { ALT } from '@/constraint/variable';
import { Button } from '@/components/ui/button';

const StorySection2 = () => {
  return (
    <section className="flex rounded-md shadow-lg">
      <div className="flex-1">
        <Image
          src={image}
          alt={ALT}
          className="h-full w-full rounded-md object-contain object-center"
        />
      </div>
      <div className="ml-10 mr-8 mt-[40px] flex-1">
        <h2 className="">Classic winter collection</h2>
        <p className="py-4 text-xl">
          Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
          gravida orci, fringilla a. Ac sed eu fringilla odio mi. Consequat
          pharetra at magna imperdiet cursus ac faucibus sit libero. Ultricies
          quam nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis
          donec dolor id in. Pulvinar commodo mollis diam sed facilisis at
          cursus imperdiet cursus ac faucibus sit faucibus sit libero.
        </p>
        <Button>Xem thêm </Button>
      </div>
    </section>
  );
};

export default StorySection2;
