import { ProductDetailRes, ProductRes, SearchProductDto } from '../product.dto';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductRepository {
  getProducts(page?: number, limit?: number): Promise<Paging<ProductRes>>;
  getProductById(id: number): Promise<ProductDetailRes | null>;
  searchProducts(dto: SearchProductDto): Promise<Paging<ProductRes>>;
}
