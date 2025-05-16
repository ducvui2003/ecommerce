import { SupplierModel } from '@shared/models/supplier.model';
import { z } from 'zod';

const SupplierResSchema = z.array(
  SupplierModel.pick({
    id: true,
    name: true,
  }),
);
type SupplierResType = z.infer<typeof SupplierResSchema>;
export { SupplierResSchema };
export type { SupplierResType };
