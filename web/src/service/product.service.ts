import { ProductResType } from '@/types/product.type';
import { ResponseApi } from '@/types/api.type';
import http from "@/lib/http.client";

const productService = {
  getAllProducts: async (): Promise<ProductResType[]> => {
    try {
      const res = await http.get<ResponseApi<ProductResType[]>>('api/v1/products/all');
      return res.payload.data;
    } catch (error) {
      throw error;
    }
  }
};

export default productService;
