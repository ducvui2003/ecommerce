import { ProductRes } from '../product.dto';
import { PagingResult } from '@shared/common/interfaces/paging-result.interface';

export interface ProductRepository {
  getProducts(page?: number, limit?: number): Promise<PagingResult<ProductRes>>;
  getProductById(id: string): Promise<ProductRes | null>;
  createProduct(product: ProductRes): Promise<ProductRes>;
  updateProduct(id: string, product: Partial<ProductRes>): Promise<ProductRes | null>;
  deleteProduct(id: string): Promise<ProductRes | null>;
  searchProducts(query: string, page?: number, limit?: number): Promise<PagingResult<ProductRes>>;
}
