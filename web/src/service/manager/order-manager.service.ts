import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import { PageReq, Paging, ResponseApiPaging } from '@/types/api.type';
import {
  OrderManagerResType,
  OrderManagerSearchParamsType,
} from '@/types/order.type';

const orderManagerService = {
  getTable: async (
    req: PageReq<OrderManagerSearchParamsType>,
  ): Promise<Paging<OrderManagerResType>> => {
    const params = toQueryString(req);
    const res = await http.get<ResponseApiPaging<OrderManagerResType>>(
      `api/v1/manager/orders/search?${params}`,
      undefined,
    );
    return res.payload.data;
  },
};
export default orderManagerService;
