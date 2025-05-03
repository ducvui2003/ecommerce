import { OptionModel } from '@shared/models/option.model';
import { ProductModel } from '@shared/models/product.model';
import { z } from 'zod';

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
}).extend({
  option: OptionModel.pick({}),
});

export const SearchProductReqSchema = z
  .object({
    name: z.string().optional(),
    categoryId: z.coerce.number().optional(),
    supplierId: z.string().optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).optional(),
  });
