import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cartService from '@/service/cart.service';
import { ResponseApi } from '@/types/api.type';

export const cartApi = createApi({
  reducerPath: 'cart',
  tagTypes: ['Cart'],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResType, void>({
      async queryFn(){
        try {
          const data = await cartService.getCart()
          console.log('DATA:', data);
          return { data };
        }catch (error: any){
          console.error('API ERROR:', error);
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags: ['Cart'],
    }),

    addCartItem: builder.mutation<void, AddCartItemReqType>({
      query: (body) => ({
        url: '/carts/current/items',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Cart']
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation
} = cartApi