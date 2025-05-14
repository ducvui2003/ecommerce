import { ProductModel, ProductType } from '@shared/models/product.model';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { SearchProductReqSchema } from '@route/product/product.schema';

export class SearchProductDto extends createZodDto(SearchProductReqSchema) {}

type ProductResType = Pick<
  ProductType,
  'id' | 'name' | 'basePrice' | 'salePrice'
> & {
  media: string[];
};

type ProductDetailResType = ProductType;

export type { ProductDetailResType as ProductDetailRes, ProductResType };
