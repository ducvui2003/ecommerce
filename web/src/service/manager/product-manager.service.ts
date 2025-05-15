import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import { PageReq, Paging, ResponseApiPaging } from '@/types/api.type';
import { ProductManagerResType, SearchParams } from '@/types/product.type';

const productManagerService = {
  getTable: async (
    req: PageReq<SearchParams>,
  ): Promise<Paging<ProductManagerResType>> => {
    const params = toQueryString(req);
    const res = await http.get<ResponseApiPaging<ProductManagerResType>>(
      `api/v1/manager/products/search?${params}`,
      undefined,
    );
    return res.payload.data;
  },
};
export default productManagerService;
