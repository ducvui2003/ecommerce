import { ProductDetailRes, ProductRes } from '../product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductService {
  findAll(page?: number, limit?: number): Promise<Paging<ProductRes>>;
  findById(id: number): Promise<ProductDetailRes | null>;
}
