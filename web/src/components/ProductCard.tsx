import { currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import Image from 'next/image';
import React from 'react';
import AddToCartButton from './button/AddToCartButton';
import { StarRating } from '@/components/StartRating';
import ShowDetailButton from '@/components/button/ShowDetailButton';

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
    <div className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
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
        <h5 className="text-center text-xl font-semibold tracking-tight text-slate-900">
          {name}
        </h5>

        <div className="mt-2 mb-2 flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">
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
        <div className={'mt-4 flex w-full items-center justify-between'}>
          <AddToCartButton productId={id} />
          <ShowDetailButton productId={id}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;