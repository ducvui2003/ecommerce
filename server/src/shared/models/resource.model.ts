import { MetadataFields, TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';

export const ResourceModel = MetadataFields.extend({
  id: z.number(),
  publicId: z.string(),
  type: z.string(),
  format: z.string(),
});

export type ResourceType = z.infer<typeof ResourceModel>;
