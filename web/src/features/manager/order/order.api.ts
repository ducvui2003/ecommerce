import orderManagerService from '@/service/manager/order-manager.service';
import userManagerService from '@/service/manager/user-manager.service';
import { PageReq, Paging, ResponseApiPaging } from '@/types/api.type';
import {
  OrderDetailResType,
  OrderManagerResType,
  OrderManagerSearchParamsType,
} from '@/types/order.type';
import {
  GetUserDetailResType,
  GetUserQueryReqType,
  GetUserResType,
  UserStatus,
} from '@/types/user.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const orderManagerApi = createApi({
  reducerPath: 'orderManagerApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  tagTypes: ['OrderManager'],

  endpoints: (builder) => ({
    getOrderTable: builder.query<
      Paging<OrderManagerResType>,
      PageReq<OrderManagerSearchParamsType>
    >({
      async queryFn(paging) {
        try {
          const data = await orderManagerService.getTable(paging);
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
              type: 'OrderManager' as const,
              id: item.id,
            })),
            {
              type: 'OrderManager' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'OrderManager' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),

    getOrderDetail: builder.query<OrderDetailResType, number>({
      async queryFn(arg) {
        try {
          const data = await orderManagerService.getDetail(arg);
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
      providesTags: (_, __, id) => [{ type: 'OrderManager', id }],
    }),

    changeStatus: builder.mutation<
      number,
      {
        id: number;
        status: Exclude<UserStatus, 'INACTIVE'>;
      }
    >({
      async queryFn({ id, status }) {
        try {
          let response;
          if (status === 'ACTIVE')
            response = await userManagerService.unblock(id);
          else response = await userManagerService.block(id);
          console.log(response);
          return { data: response.statusCode };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: (_, __, { id }) => {
        return [{ type: 'OrderManager', id: id }];
      },
    }),
  }),
});
export const {
  useGetOrderTableQuery,
  useGetOrderDetailQuery,
  useChangeStatusMutation,
} = orderManagerApi;
