import { ProductType } from '@shared/models/product.model';
import { Paging } from '@shared/common/interfaces/paging.interface';
import { SearchProductDto } from '@route/product/product.dto';
import { CreateProductBodyType } from '@route/product/product.schema';

export interface ProductRepository {
  getProductById(id: number): Promise<ProductType>;
  search(dto: SearchProductDto): Promise<Paging<ProductType>>;

  create(dto: CreateProductBodyType): Promise<ProductType>;
}
