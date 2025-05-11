import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductResType } from '@/types/product.type';
import { ProvinceType } from '@/types/address.type';
import addressService from '@/service/address.service';
import productService from '@/service/product.service';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResType[], void>({
      async query() {
        try {
          const data = await productService.getAllProducts();
          return { data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),
    getProductDetail: builder.query<ProductResType, number>({
      query: (productId) => `products/${productId}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductDetailQuery } = productApi;
