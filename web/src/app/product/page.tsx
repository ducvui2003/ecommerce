'use client';
import ListView from '@/components/ListView';
import ProductCard from '@/components/ProductCard';
import { ProductCardType } from '@/types/product.type';
import React, { useEffect, useState } from 'react';
import FilterSlice from '@/app/product/filter-slice';
import { useGetAllProductsQuery } from '@/features/product/product.api';

type SearchParams = {
  minPrice: number;
  maxPrice: number;
  volume: string;
  origin: string;
  fragrance: string;
  page?: string;
};

const data: ProductCardType[] = Array(8).fill({
  name: 'The Bloom',
  basePrice: 300000,
  numSell: 100,
  star: 4.9,
  thumbnail: '/images/product.png',
  percentSale: 20,
});

type ProductPageProps = {
  searchParams: Promise<SearchParams>;
};

const ProductPage = ({ searchParams }: ProductPageProps) => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data = [], isLoading, isError } = useGetAllProductsQuery();

  // Use useEffect to fetch and update the query and page from searchParams asynchronously
  useEffect(() => {
    const fetchSearchParams = async () => {
      const params = await searchParams;
      setQuery(params?.volume || '');  // set query based on your logic
      setCurrentPage(Number(params?.page) || 1); // set current page
    };

    fetchSearchParams();
  }, [searchParams]);

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
          <span className="text-xl font-bold">Có {data.length} sản phẩm hợp</span>
          <span>
            <span className="text-xl font-bold">Sắp xếp theo</span>
            <span className="ml-2">Bán chạy</span>
            <span className="ml-2">Giá</span>
          </span>
        </div>
        {isLoading ? (
          <div>Đang tải sản phẩm...</div>
        ) : isError ? (
          <div>Lỗi khi tải sản phẩm!</div>
        ) : (
          <ListView<ProductCardType>
            display="grid"
            data={data}
            className="product grid-cols-4 grid-rows-3 gap-5"
            render={(item, index) => <ProductCard key={index} {...item} />}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
