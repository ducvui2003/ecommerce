import {
  DecimalToNumberSchema,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { MediaModel } from '@shared/models/media.model';
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
  options: z.array(CreateOptionBodySchema),
});

const CreateProductResSchema = ProductModel.pick({
  id: true,
  name: true,
  createdAt: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
});

const MediaResSchema = MediaModel.pick({
  id: true,
}).extend({
  url: z.string(),
});

const OptionResSchema = OptionModel.pick({
  id: true,
  name: true,
  price: true,
}).extend({
  media: MediaResSchema,
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
  media: z.string(),
});

const ProductDetailManagerResSchema = ProductModel.pick({
  id: true,
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  media: z.array(MediaResSchema),
  options: z.array(OptionResSchema).optional(),
});
type ProductDetailManagerResType = z.infer<
  typeof ProductDetailManagerResSchema
>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
type CreateProductResType = z.infer<typeof CreateProductResSchema>;
type ProductManagerResType = z.infer<typeof ProductManagerResSchema>;

export {
  ProductDetailManagerResSchema,
  ProductManagerResSchema,
  CreateProductBodySchema,
  CreateProductResSchema,
};
export type {
  ProductDetailManagerResType,
  ProductManagerResType,
  CreateProductBodyType,
  CreateProductResType,
};
