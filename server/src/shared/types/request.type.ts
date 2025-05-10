import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PageableSchema = z.object({
  page: z
    .string()
    .transform(Number)
    .refine((n) => !isNaN(n) && n > 0, {
      message: 'Page must be a positive number',
    })
    .default('1'),

  size: z
    .string()
    .transform(Number)
    .refine((n) => !isNaN(n) && n > 0, {
      message: 'Size must be a positive number',
    })
    .default('10'),
});
export type  Pageable = z.infer<typeof PageableSchema>;
export class PageableDTO extends createZodDto(PageableSchema) {}
