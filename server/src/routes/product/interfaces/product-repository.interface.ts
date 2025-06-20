import { ProductType } from '@shared/models/product.model';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { SearchProductDto } from '@route/product/product.dto';
import {
  CreateProductBodyType,
  UpdateProductBodyType,
} from '@route/product/product-manager.schema';
import { ProductSitemapType } from '@route/product/product.schema';

export interface ProductRepository {
  getProductById(id: number, isDeleted?: boolean): Promise<ProductType>;
  search(dto: SearchProductDto): Promise<Paging<ProductType>>;
  create(dto: CreateProductBodyType): Promise<ProductType>;
  update(id: number, dto: UpdateProductBodyType): Promise<ProductType>;
  getNewProducts(): Promise<ProductType[]>;
  increaseView(id: number): Promise<void>;
  getMostViewProducts(): Promise<ProductType[]>;

  getAllId(): Promise<ProductSitemapType>;
}
