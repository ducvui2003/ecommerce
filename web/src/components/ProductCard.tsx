import ClientIcon from '@/components/ClientIcon';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import React from 'react';

type ProductCardProps = ProductCardType;

const ProductCard = ({
  thumbnail,
  name,
  basePrice,
  percentSale,
  star,
  numSell,
}: ProductCardProps) => {
  const price = percentSale
    ? basePrice - (basePrice * percentSale) / 100
    : basePrice;

  return (
    <Card>
      <CardContent>
        <AspectRatio ratio={9 / 10} className="overflow-hidden">
          <Image src={thumbnail} alt={name} fill className="object-contain" />
        </AspectRatio>
        <CardTitle className="text-2xl mt-2 text-center">{name}</CardTitle>
        <span className="price font-bold text-red-500 mt-2 block">
          {currency(price)}
        </span>
        {percentSale && (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-500 line-through">
              {currency(basePrice)}
            </span>
            <span className="text-red-500">{percentSale}%</span>
          </div>
        )}
        <div className="flex items-center text-xs mt-2">
          <ClientIcon
            className="text-yellow-500"
            icon={'material-symbols:star-rounded'}
            size={20}
          />
          <span>{star}</span>
          <span className="px-1">-</span>
          <span>Đã bán {numSell}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
