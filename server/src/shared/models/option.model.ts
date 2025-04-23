import { z } from 'zod';

const OptionModel = z.object({
  id: z.number(),
  name: z.string(),
  volumeId: z.number(),
  price: z.bigint().positive(),
  stock: z.number().default(0),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type OptionType = z.infer<typeof OptionModel>;
export { OptionModel };
