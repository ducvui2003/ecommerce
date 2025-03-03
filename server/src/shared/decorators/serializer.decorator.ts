import { applyDecorators, SetMetadata } from '@nestjs/common';
import { SCHEMA_KEY } from 'src/shared/constants/serializer.constant';
import { ZodSchema } from 'zod';

export default function Serializer<T>(schema: ZodSchema<T>) {
  return applyDecorators(SetMetadata(SCHEMA_KEY, schema));
}
