import { z } from 'zod';

export const ReceiverModel = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  province: z.string(),
  district: z.string(),
  ward: z.string(),
  detail: z.string(),
});
export type ReceiverType = z.infer<typeof ReceiverModel>;
