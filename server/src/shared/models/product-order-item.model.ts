import { NumberToDecimalSchema } from '@shared/models/base.model';
import { z } from 'zod';

export const ProductOrderItemModel = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  supplier: z.string(),
  price: z.number(),
  media: z.string(), //  thumbnail
  options: z
    .object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
    })
    .optional(),
});
export type ProductOrderItemModelType = z.infer<typeof ProductOrderItemModel>;
