import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const CollectionSection = () => {
  return (
    <section>
      <h2 className="text-center">Bộ sưu tập mới</h2>
      <p className="mx-auto w-1/2 pt-3 pb-10 text-center">
        Khám phá bộ sưu tập tinh dầu mới nhất – sự hòa quyện tinh tế giữa thiên
        nhiên và cảm xúc. Mỗi sản phẩm mang đến một trải nghiệm thư giãn và
        thanh lọc tuyệt vời cho không gian sống của bạn.
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
    desc: 'Tinh dầu Lavender giúp thư giãn tinh thần, giảm căng thẳng và mang đến giấc ngủ sâu tự nhiên.',
    thumbnail: '/images/collection_section.png',
  },
  {
    title: 'Hương Lavender quyến rũ',
    desc: 'Sảng khoái tức thì với hương bạc hà tươi mát – hỗ trợ làm sạch không khí và giảm mệt mỏi.',
    thumbnail: '/images/collection_section.png',
  },
  {
    title: 'Hương Lavender quyến rũ',
    desc: 'Tinh dầu gỗ đàn hương mang đến cảm giác ấm áp, an yên và hỗ trợ thiền định hiệu quả.',
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
      <h3 className="pt-2">{title}</h3>
      <p className="mt-2">{desc}</p>
      <div className="mt-5 flex">
        <Button size={'lg'}>Khám phá ngay</Button>
      </div>
    </article>
  );
};

export default CollectionSection;
