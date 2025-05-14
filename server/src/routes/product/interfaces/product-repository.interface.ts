import {
  ProductDetailRes,
  ProductResType,
  SearchProductDto,
} from '../product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductRepository {
  getProductById(id: number): Promise<ProductDetailRes | null>;
  search(dto: SearchProductDto): Promise<Paging<ProductResType>>;
}
