import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ALT } from '@/constraint/variable';
import Image from 'next/image';
import React from 'react';
import srcImage from '/public/images/banner.png';

const Banner = () => {
  return (
    <AspectRatio ratio={1440 / 568}>
      <Image
        src={srcImage}
        alt={ALT}
        fill
        className="h-full w-auto rounded-md object-contain object-top"
        placeholder="blur"
      />
    </AspectRatio>
  );
};

export default Banner;
