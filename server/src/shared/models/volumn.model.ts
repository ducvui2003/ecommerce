import { z } from 'zod';

const VolumnModel = z.object({
  id: z.number(),
  name: z.string(),
  volumeId: z.number(),
  value: z.bigint().positive(),
  unit: z.string(),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type VolumnType = z.infer<typeof VolumnModel>;
