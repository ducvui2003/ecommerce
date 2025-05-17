import { MetadataFields } from '@shared/models/base.model';
import { z } from 'zod';

export const PromotionModel = MetadataFields.extend({
  id: z.number().int().positive(),
  code: z.string(),
  description: z.string(),
  percent: z.number().positive(),
  maxAmount: z.number().positive(),
  usageLimit: z.number().int().positive(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  startDate: z.date(),
  endDate: z.date(),
})

export type PromotionType = z.infer<typeof PromotionModel>;