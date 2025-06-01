import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import {
  CreateOrderReqType,
  CreateOrderResType,
  OrderResType,
  OrderSearchParamsType,
} from '@/types/order.type';

const orderService = {
  createOrder: async (req: CreateOrderReqType) => {
    const response = await http.post<ResponseApi<CreateOrderResType>>(
      '/api/v1/orders',
      req,
    );
    return response.payload.data;
  },
  getOrders: async (
    req: PageReq<OrderSearchParamsType>,
  ): Promise<Paging<OrderResType>> => {
    const query = toQueryString(req);
    const response = await http.get<ResponseApiPaging<OrderResType>>(
      `/api/v1/orders?${query}`,
    );
    return response.payload.data;
  },
};

export default orderService;
