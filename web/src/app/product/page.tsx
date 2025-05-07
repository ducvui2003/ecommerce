import FilterSlice from '@/app/product/FilterSlice';
import ListView from '@/components/ListView';
import { CheckboxFilter } from '@/components/product/CheckboxFilter';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { currency } from '@/lib/utils';
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

type SearchParams = {
  minPrice: number;
  maxPrice: number;
  volume: string;
  origin: string;
  fragrance: string;
  page?: string;
};

type ProductPage = {
  searchParams: Promise<SearchParams>;
};
const ProductPage = async ({ searchParams }: ProductPage) => {
  const searchParamsAsync = await searchParams;
  const query = searchParamsAsync || '';
  const currentPage = Number(searchParamsAsync?.page) || 1;

  return (
    <div className="mt-10 flex gap-4">
      <div className="filter-left basis-[350px]">
        <h3 className="bg-primary px-5 py-2.5 text-center text-2xl">
          Lọc sản phẩm
        </h3>
        <FilterSlice />
      </div>
      <div className="flex-1">
        <div className="filter-header my-3 flex items-center justify-between">
          <span className="text-xl font-bold">Có ... sản phẩm hợp</span>
          <span>
            <span className="text-xl font-bold">Sắp xếp theo</span>
            <span className="ml-2">Bán chạy</span>
            <span className="ml-2">Giá</span>
          </span>
        </div>
        <ListView<ProductCardType>
          display="grid"
          data={data}
          className="product grid-cols-4 grid-rows-3 gap-5"
          render={(item, index) => <ProductCard key={index} {...item} />}
        />
      </div>
    </div>
  );
};

export default ProductPage;
