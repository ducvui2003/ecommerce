import { MetadataFields } from '@shared/models/base.model';
import { z } from 'zod';

export const CategoryModel = MetadataFields.extend({
  id: z.number(),
  name: z.string(),
});

export type CategoryType = z.infer<typeof CategoryModel>;
