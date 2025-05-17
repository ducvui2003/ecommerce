'use client';

import { useState } from 'react';
import { ProductDetailRespType } from '@/types/product.type';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductOption from './ProductOption';
import AddToCartTextButton from '@/components/button/AddToCartTextButton';
import WishlistButton from '@/components/button/WishlistButton';
import QuantitySelector from "@/components/QuantitySelector";
import ProductDescription from "@/app/product/detail/[id]/ProductDescription";
import RatingSummary from "@/app/product/detail/[id]/RatingSummary";
import ProductComment from "@/app/product/detail/[id]/ProductComment";
import notFound from "@/app/not-found";

type ProductDetailProps = {
  product: ProductDetailRespType;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product) return notFound();

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const productInfoData = {
    name: product.name,
    supplierName: product.supplier.name,
    productType: product.category.name,
    description: product.description,
    basePrice: product.basePrice,
    salePrice: product.salePrice,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <ProductImages images={product.media} />
        </div>

        <div className="flex flex-col space-y-6">
          <ProductInfo product={productInfoData} />
          <ProductOption options={product.option} />
          <div className={"mt-2"}>
            <QuantitySelector/>
          </div>
          <div className="pt-4 flex gap-4 items-center">
            <AddToCartTextButton productId={product.id} />
            <WishlistButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          </div>
        </div>
      </div>
      <div className={"mt-5 lg:mt-10"}>
        <ProductDescription description={product.description}/>
      </div>
      <div>
        <RatingSummary/>
        <ProductComment/>
      </div>
    </div>
  );
}
