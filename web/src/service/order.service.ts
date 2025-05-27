import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { CreateOrderReqType, CreateOrderResType } from '@/types/order.type';

const orderService = {
  createOrder: async (req: CreateOrderReqType) => {
    const response = await http.post<ResponseApi<CreateOrderResType>>(
      '/api/v1/orders',
      req,
    );
    return response.payload.data;
  },
};

export default orderService;
