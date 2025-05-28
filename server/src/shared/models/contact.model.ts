import { MetadataFields } from '@shared/models/base.model';
import { z } from 'zod';

export const ContactModel = MetadataFields.extend({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
  title: z.string(),
  status: z.string(),
});

export type ContactType = z.infer<typeof ContactModel>;
