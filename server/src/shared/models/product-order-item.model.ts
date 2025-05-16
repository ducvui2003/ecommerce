import { NumberToDecimalSchema } from '@shared/models/base.model';
import { z } from 'zod';

export const ProductOrderItemModel = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  supplier: z.string(),
  price: NumberToDecimalSchema,
  media: z.string(), //  thumbnail
  options: z
    .object({
      id: z.number(),
      name: z.string(),
      price: z.string(),
    })
    .optional(),
});
export type ProductOrderItemModelType = z.infer<typeof ProductOrderItemModel>;
