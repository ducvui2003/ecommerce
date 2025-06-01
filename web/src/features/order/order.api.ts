import orderService from '@/service/order.service';
import { PageReq, Paging } from '@/types/api.type';
import { OrderResType, OrderSearchParamsType } from '@/types/order.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getOrderTable: builder.query<
      Paging<OrderResType>,
      PageReq<OrderSearchParamsType>
    >({
      async queryFn(req) {
        try {
          const data = await orderService.getOrders(req);
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
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
              type: 'Order' as const,
              id: item.id,
            })),
            {
              type: 'Order' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'Order' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),
  }),
});

export const { useGetOrderTableQuery } = orderApi;
