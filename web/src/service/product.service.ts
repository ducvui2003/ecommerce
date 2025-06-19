import { PageReq, ResponseApi } from '@/types/api.type';
import { toQueryString } from '@/lib/utils';
import {
  FilterReviewQueryType,
  GetReviewsOfProductResType,
} from '@/types/review.type';
import httpClient from '@/lib/http.client';

const productService = {
  getReviewsOfProduct: async (
    productId: number,
    query: PageReq<FilterReviewQueryType>,
  ): Promise<GetReviewsOfProductResType> => {
    const response = await httpClient.get<
      ResponseApi<GetReviewsOfProductResType>
    >(
      `api/v1/products/${productId}/reviews?${toQueryString(query)}`,
      undefined,
      false,
    );
    return response.payload.data;
  },
};

export default productService;
