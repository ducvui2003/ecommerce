import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const CollectionSection = () => {
  return (
    <section className="container h-screen overflow-hidden">
      <h2 className="text-center">Bộ sưu tập mới</h2>
      <p className="mx-auto w-1/2 pb-10 pt-3 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas
        ut dolorum consequuntur, adipisci repellat! Eveniet commodi voluptatem
        voluptate, eum minima, in suscipit explicabo voluptatibus harum,
        quibusdam ex repellat eaque!
      </p>
      <div className="flex justify-between">
        {products.map((item, index) => (
          <Product {...item} key={index} container="w-[370px]" />
        ))}
      </div>
    </section>
  );
};

const products: ProductProps[] = [
  {
    title: 'Hương Lavender quyến rũ',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci repellat',
    thumbnail: '/images/collection_section.png',
  },
  {
    title: 'Hương Lavender quyến rũ',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci repellat',
    thumbnail: '/images/collection_section.png',
  },
  {
    title: 'Hương Lavender quyến rũ',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci repellat',
    thumbnail: '/images/collection_section.png',
  },
];

type ProductProps = {
  thumbnail: string;
  title: string;
  desc: string;
};

const Product = ({
  thumbnail,
  title,
  desc,
  container,
}: ProductProps & { container?: string }) => {
  return (
    <article className={cn(container)}>
      <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-3xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="w-full object-cover"
        />
      </AspectRatio>
      <h3 className="pb-4 pt-2">{title}</h3>
      <p>{desc}</p>
      <div className="flex justify-end">
        <Button>Khám phá ngay</Button>
      </div>
    </article>
  );
};

export default CollectionSection;
