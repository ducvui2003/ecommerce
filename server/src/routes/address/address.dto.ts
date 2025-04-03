import {
  CreatedAddressBodySchema,
  UpdatedAddressBodySchema,
} from '@route/address/address.schema';
import { createZodDto } from 'nestjs-zod';

export class CreatedAddressDTO extends createZodDto(CreatedAddressBodySchema) {}

export class UpdatedAddressDTO extends createZodDto(UpdatedAddressBodySchema) {}
