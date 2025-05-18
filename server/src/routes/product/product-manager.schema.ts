import {
  DecimalToNumberSchema,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { ResourceModel } from '@shared/models/resource.model';
import { OptionModel } from '@shared/models/option.model';
import { ProductModel } from '@shared/models/product.model';
import { z } from 'zod';

const CreateOptionBodySchema = OptionModel.pick({
  name: true,
  resourceId: true,
  stock: true,
}).extend({
  price: NumberToDecimalSchema,
});

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
}).extend({
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalSchema,
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema).optional(),
});

const CreateProductResSchema = ProductModel.pick({
  id: true,
  name: true,
  createdAt: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
});

const ResourceResSchema = ResourceModel.pick({
  id: true,
  publicId: true,
}).extend({
  url: z.string(),
});

const OptionResSchema = OptionModel.pick({
  id: true,
  name: true,
  stock: true,
}).extend({
  price: DecimalToNumberSchema,
  resource: ResourceResSchema,
});

const ProductManagerResSchema = ProductModel.pick({
  id: true,
  name: true,
  createdAt: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  category: z.string(),
  supplier: z.string(),
  resource: z.string(),
});

const ProductDetailManagerResSchema = ProductModel.pick({
  id: true,
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  resources: z.array(ResourceResSchema),
  options: z.array(OptionResSchema).optional(),
});

const UpdateProductResSchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
}).extend({
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalSchema,
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema).optional(),
});

type ProductDetailManagerResType = z.infer<
  typeof ProductDetailManagerResSchema
>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
type CreateProductResType = z.infer<typeof CreateProductResSchema>;
type ProductManagerResType = z.infer<typeof ProductManagerResSchema>;
type UpdateProductResType = z.infer<typeof UpdateProductResSchema>;
export {
  ProductDetailManagerResSchema,
  ProductManagerResSchema,
  CreateProductBodySchema,
  CreateProductResSchema,
  UpdateProductResSchema,
};
export type {
  ProductDetailManagerResType,
  ProductManagerResType,
  CreateProductBodyType,
  CreateProductResType,
  UpdateProductResType,
};
