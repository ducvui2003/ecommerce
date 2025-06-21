import { SearchProductDto } from '@route/product/product.dto';
import {
  ProductDetailResType,
  ProductResType,
  ProductSitemapType,
} from '@route/product/product.schema';
import { Paging } from '@shared/common/interfaces/paging.interface';

export interface ProductService {
  findById(id: number): Promise<ProductDetailResType>;
  search(dto: SearchProductDto): Promise<Paging<ProductResType>>;
  getNewProducts(): Promise<ProductResType[]>;
  getMostViewProducts(): Promise<ProductResType[]>;

  getSitemap(): Promise<ProductSitemapType>;
}
