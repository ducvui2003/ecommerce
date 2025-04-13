import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { uuid } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import React from 'react';

const data: ProductCardType[] = Array(8).fill({
  name: 'The Bloom',
  basePrice: 300000,
  numSell: 100,
  star: 4.9,
  thumbnail: '/images/product.png',
  percentSale: 20,
});

const SellerSection = () => {
  return (
    <section className="container">
      <div className="flex items-center justify-between gap-3 before:h-[2px] before:flex-1 before:bg-yellow-400 after:h-[2px] after:flex-1 after:bg-yellow-400">
        <h2 className="mx-5 text-yellow-400">Best Seller</h2>
      </div>
      <div className="mt-16 grid grid-cols-4 grid-rows-2 gap-28">
        {data.map((item) => (
          <ProductCard key={uuid()} {...item} />
        ))}
      </div>
      <Button className="mx-auto mt-16 block">Xem thêm</Button>
    </section>
  );
};

export default SellerSection;
