import {
  ProductDetailRespType,
  ProductResType,
  SearchParams,
  SearchProductResType,
} from '@/types/product.type';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import httpServer from '@/lib/http.server';
import { toQueryString } from '@/lib/utils';

const productService = {
  getAllProducts: async (
    req: PageReq<SearchParams>,
  ): Promise<Paging<ProductResType>> => {
    const params = toQueryString(req);
    const res = await httpServer.get<ResponseApiPaging<ProductResType>>(
      `api/v1/products/search?${params}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  getProductById: async (id: number): Promise<ProductDetailRespType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailRespType>>(
      `api/v1/products/${id}`,
      undefined,
      false,
    );
    return res.payload.data;
  },
};

export default productService;
