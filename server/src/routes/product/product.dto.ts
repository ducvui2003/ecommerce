import { SearchProductReqSchema } from '@route/product/product.schema';
import { ProductType } from '@shared/models/product.model';
import { createZodDto } from 'nestjs-zod';

export class SearchProductDto extends createZodDto(SearchProductReqSchema) {}
