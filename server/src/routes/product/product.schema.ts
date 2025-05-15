import { OrderBy, SortBy } from '@shared/constants/product.constant';
import {
  DecimalToNumberSchema,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { OptionModel } from '@shared/models/option.model';
import { ProductModel, ProductType } from '@shared/models/product.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const orderBySchema = z.enum([OrderBy.Asc, OrderBy.Desc]);
const sortBySchema = z.enum([SortBy.CreatedAt, SortBy.Price]);

const sortSchema = z
  .string()
  .refine((val) => val.includes('_'), {
    message: 'Sort format must be like "price_asc"',
  })
  .transform((val) => {
    const [sortBy, orderBy] = val.split('_');
    return { sortBy, orderBy };
  })
  .pipe(
    z.object({
      sortBy: sortBySchema,
      orderBy: orderBySchema,
    }),
  );

const SearchProductReqSchema = PageableSchema.extend({
  name: z.string().optional(),
  categoryId: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .optional()
    .transform((val: number | number[] | undefined) => {
      if (val === undefined) return [];

      return Array.isArray(val) ? val : [val];
    }),
  supplierId: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .optional()
    .transform((val) => {
      if (val === undefined) return [];
      return Array.isArray(val) ? val : [val];
    }),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z
    .array(sortSchema)
    .default([`${SortBy.CreatedAt}_${OrderBy.Desc}`])
    .transform((val) =>
      val.map((sortString) => {
        const { sortBy, orderBy } = sortString;
        return { sortBy, orderBy };
      }),
    ),
});

const ProductResSchema = ProductModel.pick({
  id: true,
  name: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  media: z.array(z.string()),
});

const ProductDetailResSchema = ProductModel.pick({
  id: true,
  name: true,
  description: true,
})
  .extend({
    basePrice: DecimalToNumberSchema,
    salePrice: DecimalToNumberSchema,
    category: CategoryModel.pick({
      name: true,
    }),
    supplier: SupplierModel.pick({
      name: true,
    }),
    media: z.array(z.string()),
  })
  .optional();

const CreateOptionBodySchema = OptionModel.pick({
  name: true,
  price: true,
  resourceId: true,
  stock: true,
});

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
  supplierId: true,
}).extend({
  basePrice: NumberToDecimalSchema,
  salePrice: NumberToDecimalSchema,
  resourceIds: z.array(z.string().min(1)),
  isDeleted: z.boolean().optional().default(false),
  options: z.array(CreateOptionBodySchema),
});

type ProductDetailResType = z.infer<typeof ProductDetailResSchema>;
type ProductResType = z.infer<typeof ProductResSchema>;
type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;

export {
  SearchProductReqSchema,
  ProductDetailResSchema,
  ProductResSchema,
  CreateProductBodySchema,
};
export type { ProductDetailResType, ProductResType, CreateProductBodyType };
