import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';

const cartService = {
  getCart: async (): Promise<GetCartResType> => {
    const response = await http.get<ResponseApi<GetCartResType>>(
      '/api/v1/carts/current',
    );
    return response.payload.data;
  },
  addCartItem: async (body: AddCartItemReqType) => {
    await http.post('/api/v1/carts/current/items', body);
  },
};

export default cartService;
