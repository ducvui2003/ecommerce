import { UnprocessableEntityException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

export const ZodValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: ZodError) => {
    return new UnprocessableEntityException(
      error.errors.map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      })),
    );
  },
});
