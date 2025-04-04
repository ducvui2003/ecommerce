import { z } from 'zod';

export const AddressModel = z.object({
  id: z.number(),
  detail: z.string(),
  ward: z.string(),
  district: z.string(),
  province: z.string(),

  userId: z.number(),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deleteAt: z.date().nullable().optional(),
});

export type AddressType = z.infer<typeof AddressModel>;
