import { UnprocessableEntityException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

// Custom exception Zod Dto validation
export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    return new UnprocessableEntityException(
      error.errors.map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      })),
    );
  },
});
