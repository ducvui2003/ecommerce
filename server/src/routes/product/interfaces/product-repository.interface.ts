import { ProductType } from '@shared/models/product.model';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { SearchProductDto } from '@route/product/product.dto';
import {
  CreateProductBodyType,
  UpdateProductBodyType,
} from '@route/product/product-manager.schema';

export interface ProductRepository {
  getProductById(id: number): Promise<ProductType>;
  search(dto: SearchProductDto): Promise<Paging<ProductType>>;
  create(dto: CreateProductBodyType): Promise<ProductType>;
  update(id: number, dto: UpdateProductBodyType): Promise<ProductType>;
}
