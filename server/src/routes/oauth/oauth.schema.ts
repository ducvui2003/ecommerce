import { z } from 'zod';

export const GoogleBodySchema = z
  .object({
    accessToken: z.string(),
  })
  .strict();
