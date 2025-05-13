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

export const SearchProductReqSchema = z.object({
  name: z.string().optional(),
  categoryId: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .optional()
    .transform((val: number | number[] | undefined) => {
      if (val === undefined) return [];
      return Array.isArray(val) ? val : [val];
    }),
  supplierId: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .optional()
    .transform((val) => {
      if (val === undefined) return [];
      return Array.isArray(val) ? val : [val];
    }),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
});
