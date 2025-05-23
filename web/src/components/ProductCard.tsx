import { currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import Image from 'next/image';
import React from 'react';
import { StarRating } from '@/components/StartRating';
import Link from '@/components/Link';

type ProductCardProps = ProductCardType;
const getDiscountedPrice = (base: number, percent?: number) => {
  return percent ? base - (base * percent) / 100 : base;
};
const ProductCard = ({
  id,
  thumbnail,
  name,
  basePrice,
  percentSale,
  star,
  numSell,
}: ProductCardProps) => {
  const price = getDiscountedPrice(basePrice, percentSale);
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
        <Image
          src={thumbnail ?? '/images/product.png'}
          alt={name}
          fill
          className="rounded-xl object-cover"
        />
        {percentSale && (
          <span className="absolute top-2 left-2 rounded-full bg-[#FFAB66D1] px-2 py-0.5 text-sm font-medium text-white">
            {percentSale}% OFF
          </span>
        )}
      </div>

      <div className="mt-4 px-5 pb-5">
        <Link href={`/product/detail/${id}`} className="hover:underline">
          <h5 className="text-md o line-clamp-3 h-[80px] text-center font-semibold tracking-tight text-slate-900">
            {name}
          </h5>
        </Link>

        <div className="mt-2 mb-2 flex items-center gap-2">
          <span className="text-md font-bold text-red-600">
            {currency(price)}
          </span>
          {percentSale && (
            <span className="text-sm text-gray-400 line-through">
              {currency(basePrice)}
            </span>
          )}
        </div>
        <StarRating star={star} />
        <span className="text-gray-600">
          {star} | Đã bán {numSell}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
