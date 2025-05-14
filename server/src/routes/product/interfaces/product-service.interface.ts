import { SearchProductDto } from '@route/product/product.dto';
import {
  ProductDetailResType,
  ProductResType,
} from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductService {
  findById(id: number): Promise<ProductDetailResType>;
  search(dto: SearchProductDto): Promise<Paging<ProductResType>>;
}
