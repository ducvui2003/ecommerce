import productManagerService from '@/service/manager/product-manager.service';
import { PageReq, Paging } from '@/types/api.type';
import { ProductManagerResType, SearchParams } from '@/types/product.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productManagerApi = createApi({
  reducerPath: 'productManagerApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['ProductManager'],
  endpoints: (builder) => ({
    getProductTable: builder.query<
      Paging<ProductManagerResType>,
      PageReq<SearchParams>
    >({
      async queryFn(paging) {
        try {
          const data = await productManagerService.getTable(paging);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
              type: 'ProductManager' as const,
              id: item.id,
            })),
            {
              type: 'ProductManager' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'ProductManager' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),
  }),
});

export const { useGetProductTableQuery } = productManagerApi;
