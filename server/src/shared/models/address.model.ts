import { MetadataFields } from '@shared/models/base.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { UserModel } from '@shared/models/user.model';
import { z } from 'zod';

export const AddressModel = MetadataFields.extend({
  id: z.number(),
  detail: z.string(),
  ward: z.string(),
  district: z.string(),
  province: z.string(),

  userId: z.number(),
  user: UserModel,

  supplier: SupplierModel.optional(),
});

export type AddressType = z.infer<typeof AddressModel>;
