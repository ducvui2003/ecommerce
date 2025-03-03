import { z } from 'zod';

export const RoleModel = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type RoleType = z.infer<typeof RoleModel>;
