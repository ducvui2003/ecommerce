import { MetadataFields, TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';

export const MediaModel = MetadataFields.extend({
  id: z.number(),
  publicId: z.string(),
  type: z.string(),
  format: z.string(),
});

export type MediaType = z.infer<typeof MediaModel>;
