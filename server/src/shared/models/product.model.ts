import { Prisma } from '@prisma/client';
import {
  MetadataFields,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { MediaModel } from '@shared/models/media.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { z } from 'zod';

export const ProductModel = MetadataFields.extend({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.number(),
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalSchema,
  productResource: z.array(
    z.object({
      productId: z.number(),
      resourceId: z.number(),
      resource: MediaModel,
    }),
  ),
  media: z.array(MediaModel).optional(),
  category: CategoryModel,
  supplier: SupplierModel,
});

export type ProductType = z.infer<typeof ProductModel>;
