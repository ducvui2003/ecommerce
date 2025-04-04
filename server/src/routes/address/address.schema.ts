import { AddressModel } from '@shared/models/address.model';
import { z } from 'zod';

export const CreatedAddressBodySchema = AddressModel.pick({
  province: true,
  district: true,
  ward: true,
  detail: true,
}).strict();

export type CreatedAddressBodyType = z.infer<typeof CreatedAddressBodySchema>;

export const UpdatedAddressBodySchema = AddressModel.pick({
  province: true,
  district: true,
  ward: true,
  detail: true,
  id: true,
}).strict();

export type UpdatedAddressBodyType = z.infer<typeof UpdatedAddressBodySchema>;
