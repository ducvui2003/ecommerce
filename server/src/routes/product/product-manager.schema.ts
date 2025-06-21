import {
  DecimalToNumberOptionalSchema,
  DecimalToNumberSchema,
  NumberToDecimalOptionalSchema,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { ResourceModel } from '@shared/models/resource.model';
import { OptionModel } from '@shared/models/option.model';
import { ProductModel } from '@shared/models/product.model';
import z3, { z } from 'zod';

const CreateOptionBodySchema = OptionModel.pick({
  name: true,
  resourceId: true,
  stock: true,
}).extend({
  price: NumberToDecimalSchema,
});

const UpdateOptionBodySchema = OptionModel.pick({
  name: true,
  resourceId: true,
  stock: true,
}).extend({
  id: z.number().nullable(),
  price: NumberToDecimalSchema,
});

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
}).extend({
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalOptionalSchema,
  thumbnailId: z.coerce.number().optional(),
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
  salePrice: DecimalToNumberOptionalSchema,
});

const UpdateProductResSchema = CreateProductResSchema;

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
  isDeleted: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberOptionalSchema,
  category: z.string(),
  supplier: z.string(),
  thumbnail: z.string().optional(),
});

const ProductDetailManagerResSchema = ProductModel.pick({
  id: true,
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
  createdAt: true,
  updatedAt: true,
  isDeleted: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberOptionalSchema,
  thumbnail: ResourceResSchema,
  resources: z.array(ResourceResSchema),
  options: z.array(OptionResSchema).optional(),
});

const UpdateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
}).extend({
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalOptionalSchema,
  thumbnailId: z.coerce.number().optional(),
  resourceIds: z.array(z.number()).optional(),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(UpdateOptionBodySchema).optional(),
});

type ProductDetailManagerResType = z.infer<
  typeof ProductDetailManagerResSchema
>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;
type CreateProductResType = z.infer<typeof CreateProductResSchema>;
type ProductManagerResType = z.infer<typeof ProductManagerResSchema>;
type UpdateProductResType = z.infer<typeof UpdateProductResSchema>;
export {
  ProductDetailManagerResSchema,
  ProductManagerResSchema,
  CreateProductBodySchema,
  CreateProductResSchema,
  UpdateProductBodySchema,
  UpdateProductResSchema,
};
export type {
  ProductDetailManagerResType,
  ProductManagerResType,
  CreateProductBodyType,
  CreateProductResType,
  UpdateProductResType,
  UpdateProductBodyType,
};
