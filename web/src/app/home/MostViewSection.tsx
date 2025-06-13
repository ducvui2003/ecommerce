'use client';

import React, { useRef, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useGetMostViewProductsQuery, useGetNewProductsQuery } from '@/features/product/product.api';
import { ProductCardType } from '@/types/product.type';

const CARD_WIDTH = 220;
const VISIBLE_CARDS = 5;

const MostViewSection = () => {
  const { data, isLoading, isError } = useGetMostViewProductsQuery();
  const products = data ?? [];
  const carouselRef = useRef<HTMLDivElement>(null);

  const fullList = [...products, ...products.slice(0, VISIBLE_CARDS)];

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!container) return;

        container.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });

        if (
          container.scrollLeft >=
          CARD_WIDTH * (products.length + 1 - VISIBLE_CARDS)
        ) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'auto' });
          }, 300);
        }
      }, 2500);
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval);
  }, [products]);

  return (
    <section className="container">
      <div className="flex items-center justify-between gap-3 before:h-[2px] before:flex-1 before:bg-yellow-400 after:h-[2px] after:flex-1 after:bg-yellow-400">
        <h2 className="mx-5 text-primary">Sản phẩm xem nhiều</h2>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex w-full overflow-x-auto scroll-smooth scrollbar-hide space-x-5"
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Đã xảy ra lỗi khi tải sản phẩm</p>
          ) : (
            fullList.map((item: ProductCardType, index: number) => (
              <div
                key={index}
                className="flex-none w-[200px]"
              >
                <ProductCard {...item} />
              </div>
            ))
          )}
        </div>
      </div>

      <Button className="mx-auto mt-16 block">Xem thêm</Button>
    </section>
  );
};

export default MostViewSection;
