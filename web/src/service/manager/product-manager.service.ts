import http from '@/lib/http.client';
import { toQueryString } from '@/lib/utils';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import {
  CreateProductBodyType,
  CreateProductResType,
  ProductManagerResType,
  SearchParams,
} from '@/types/product.type';

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

  create: async (req: CreateProductBodyType): Promise<CreateProductResType> => {
    const res = await http.post<ResponseApi<CreateProductResType>>(
      `api/v1/manager/products`,
      req,
      undefined,
      true,
    );
    return res.payload.data;
  },
};
export default productManagerService;
