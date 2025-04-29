import { ProductDetailRes, ProductRes } from '../product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductRepository {
  getProducts(page?: number, limit?: number): Promise<Paging<ProductRes>>;
  getProductById(id: number): Promise<ProductDetailRes | null>;
}
