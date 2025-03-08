import { OAuth2BodySchema } from '@route/oauth/oauth.schema';
import { createZodDto } from 'nestjs-zod';

export class OAuth2BodyReq extends createZodDto(OAuth2BodySchema) {}
