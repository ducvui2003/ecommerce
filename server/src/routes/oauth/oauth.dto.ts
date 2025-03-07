import { GoogleBodySchema } from '@route/oauth/oauth.schema';
import { createZodDto } from 'nestjs-zod';

export class GoogleBodyReq extends createZodDto(GoogleBodySchema) {}
