import { Logger, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from '@shared/types/response.type';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

// Exception in zod validation (only use for DTO)
export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    // When Zod can not parse a schema, it auto throw error UnprocessableEntityException
    console.log(error);
    return new UnprocessableEntityException(
      error.errors.map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      })) as ValidationError[],
    );
  },
});
