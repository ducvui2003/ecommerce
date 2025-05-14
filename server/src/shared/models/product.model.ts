import { MetadataFields } from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { MediaModel } from '@shared/models/media.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { z } from 'zod';

export const ProductModel = MetadataFields.extend({
  id: z.number(),
  name: z.string().min(8),
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.string(),
  basePrice: z.number().positive().optional(),
  salePrice: z.number().positive().optional(),

  media: z.array(MediaModel).optional(),
  category: CategoryModel,
  supplier: SupplierModel,
});

export type ProductType = z.infer<typeof ProductModel>;
