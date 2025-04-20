import { AddressModel } from '@shared/models/address.model';
import { MetadataFields } from '@shared/models/base.model';
import { ProductModel } from '@shared/models/product.model';
import { z } from 'zod';

export const SupplierModel = MetadataFields.extend({
  id: z.number(),
  name: z.string().min(8),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  website: z.string(),
  product: z.array(ProductModel),
  addressId: z.number(),
  address: AddressModel,
});

export type SupplierType = z.infer<typeof SupplierModel>;
