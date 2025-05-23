import { NumberToDecimalSchema } from '@shared/models/base.model';
import { z } from 'zod';

const OptionModel = z.object({
  id: z.number(),
  name: z.string(),
  price: NumberToDecimalSchema,
  stock: z.number().nullable().default(0),

  productId: z.number(),
  resourceId: z.number().nullable(),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type OptionType = z.infer<typeof OptionModel>;
export { OptionModel };
