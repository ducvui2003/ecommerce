'use client';

import ListView from '@/components/ListView';
import ProductCard from '@/components/ProductCard';
import { ProductCardType } from '@/types/product.type';
import React, { useEffect, useState } from 'react';
import FilterSlice from '@/app/product/filter-slice';
import envConfig from '@/config/env.config';

type SearchParams = {
  minPrice?: string;
  maxPrice?: string;
  volume?: string;
  origin?: string;
  fragrance?: string;
  page?: string;
};

type ProductPageProps = {
  searchParams: SearchParams;
};

const ProductPage = ({ searchParams }: ProductPageProps) => {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const hasFilters = Object.values(searchParams).some(v => v !== undefined && v !== '');
        const url = hasFilters
          ? `${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/products/search?${new URLSearchParams(searchParams).toString()}`
          : `${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/products/all`;

        const res = await fetch(url);

        if (!res.ok) throw new Error('Failed to fetch products');

        const data: ProductCardType[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Lỗi khi fetch:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="mt-10 flex gap-4">
      <div className="filter-left basis-[350px]">
        <h3 className="bg-primary px-5 py-2.5 text-center text-2xl">Lọc sản phẩm</h3>
        <FilterSlice />
      </div>
      <div className="flex-1">
        <div className="filter-header my-3 flex items-center justify-between">
          <span className="text-xl font-bold">Có {products.length} sản phẩm hợp</span>
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
            data={products}
            className="product grid-cols-4 grid-rows-3 gap-5"
            render={(item, index) => <ProductCard key={index} {...item} />}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
