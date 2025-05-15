'use client';

import { useState } from 'react';
import { ProductDetailRespType } from '@/types/product.type';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductVolumeSelector from './ProductVolumn';
import AddToCartTextButton from '@/components/button/AddToCartTextButton';
import WishlistButton from '@/components/button/WishlistButton';

type ProductDetailProps = {
  product: ProductDetailRespType;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product) return <div>Loading...</div>;

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
          <ProductVolumeSelector />
          <div className="pt-4 flex gap-4 items-center">
            <AddToCartTextButton productId={product.id} />
            <WishlistButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
}
