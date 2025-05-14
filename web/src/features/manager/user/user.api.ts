import userManagerService from '@/service/manager/user.service';
import { Paging, ResponseApiPaging } from '@/types/api.type';
import {
  GetUserDetailResType,
  GetUserQueryReqType,
  GetUserResType,
} from '@/types/user.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
  reducerPath: 'userApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getUserTable: builder.query<Paging<GetUserResType>, GetUserQueryReqType>({
      async queryFn(paging) {
        try {
          const data = await userManagerService.getTable(paging);
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
    }),

    getUserDetail: builder.query<GetUserDetailResType, number>({
      async queryFn(arg) {
        try {
          const data = await userManagerService.getDetail(arg);
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
    }),
  }),
});
export const { useGetUserTableQuery, useGetUserDetailQuery } = userApi;
