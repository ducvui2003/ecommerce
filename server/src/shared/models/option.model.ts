import { z } from 'zod';
import { MetadataFields } from '@shared/models/base.model';

export const OptionModel = MetadataFields.extend({
  id: z.number().int().positive(),
  name: z.string(),
  volumeId: z.number(),
  price: z.number().positive(),
  stock: z.number().int().positive().default(0),
});

export type OptionType = z.infer<typeof OptionModel>;
// export { OptionModel };
