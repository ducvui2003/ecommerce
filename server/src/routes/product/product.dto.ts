import { ProductModel, ProductType } from '@shared/models/product.model';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { SearchProductReqSchema } from '@route/product/product.schema';

type ProductRes = Omit<
  ProductType,
  'supplier' | 'supplierId' | 'category' | 'categoryId'
> & {
  category: string;
};

type ProductDetailRes = ProductType;
export class SearchProductDto extends createZodDto(SearchProductReqSchema) {}
export type { ProductRes, ProductDetailRes };
