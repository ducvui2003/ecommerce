import {
  NumberToDecimalOptionalSchema,
  NumberToDecimalSchema,
  TimestampFields,
} from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { ResourceModel } from '@shared/models/resource.model';
import { OptionModel } from '@shared/models/option.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { z } from 'zod';

export const ProductModel = TimestampFields.extend({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  supplierId: z.number(),
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalOptionalSchema,
  views: z.number().default(0),
  productResource: z.array(
    z
      .object({
        productId: z.number(),
        resourceId: z.number(),
        resource: ResourceModel,
        createdAt: z.date(),
      })
      .nullable()
      .optional(),
  ),
  thumbnailId: z.number().nullable().optional(),
  thumbnail: ResourceModel.nullable().optional(),
  option: z.array(OptionModel).optional(),
  category: CategoryModel,
  supplier: SupplierModel,
  isDeleted: z.boolean().nullable().default(false),
});

export type ProductType = z.infer<typeof ProductModel>;
