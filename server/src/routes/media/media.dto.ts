import {
  ChangeVisibilitySchema,
  CreatedMediaBodySchema,
  SearchMediaReqSchema,
  SignatureBodySchema,
} from '@route/media/media.schema';
import { createZodDto } from 'nestjs-zod';

export class SearchMediaReqDTO extends createZodDto(SearchMediaReqSchema) {}
export class SignatureDTO extends createZodDto(SignatureBodySchema) {}
export class CreatedMediaDTO extends createZodDto(CreatedMediaBodySchema) {}
export class ChangeVisibilityDTO extends createZodDto(ChangeVisibilitySchema) {}
