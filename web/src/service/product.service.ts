import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import { toQueryString } from '@/lib/utils';
import {
  FilterReviewQueryType,
  GetReviewsOfProductResType,
} from '@/types/review.type';
import httpClient from '@/lib/http.client';
import httpServer from '@/lib/http.server';
import {
  ProductDetailRespType,
  ProductResType,
  SearchParams,
} from '@/types/product.type';

const productService = {
  getAllProducts: async (
    req: PageReq<SearchParams>,
  ): Promise<Paging<ProductResType>> => {
    const params = toQueryString({ ...req, isDeleted: false });
    const res = await httpServer.get<ResponseApiPaging<ProductResType>>(
      `api/v1/products/search?${params}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  getReviewsOfProduct: async (
    productId: number,
    query: PageReq<FilterReviewQueryType>,
  ): Promise<GetReviewsOfProductResType> => {
    const res = await httpClient.get<ResponseApi<GetReviewsOfProductResType>>(
      `api/v1/products/${productId}/reviews?${toQueryString(query)}`,
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
