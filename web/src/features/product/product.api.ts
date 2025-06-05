import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductResType, SearchProductResType } from '@/types/product.type';
import { toQueryString } from '@/lib/utils';
import { ResponseApiPaging } from '@/types/api.type';
import httpClient from '@/lib/http.client';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    searchProduct: builder.query<SearchProductResType, String>({
      async queryFn(name: string) {
        try {
          const params = toQueryString({ name: name });
          const response = await httpClient.get<
            ResponseApiPaging<ProductResType>
          >(`api/v1/products/search?${params}`, undefined, false);
          return { data: response.payload.data};
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      }
    }),
  }),
});

export const { useSearchProductQuery } = productApi;
