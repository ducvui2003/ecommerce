import { ProductRes } from '../product.dto';
import { PagingResult } from '@shared/common/interfaces/paging-result.interface';

export interface ProductService {
  findAll(page?: number, limit?: number): Promise<PagingResult<ProductRes>>;
}
