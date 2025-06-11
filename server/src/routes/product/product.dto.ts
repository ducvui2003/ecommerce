import {
  CreateProductBodySchema,
  UpdateProductBodySchema,
} from '@route/product/product-manager.schema';
import { SearchProductReqSchema } from '@route/product/product.schema';
import { createZodDto } from 'nestjs-zod';

export class SearchProductDto extends createZodDto(SearchProductReqSchema) {}
export class CreateProductBodyDto extends createZodDto(
  CreateProductBodySchema,
) {}
export class UpdateProductBodyDto extends createZodDto(
  UpdateProductBodySchema,
) {}
