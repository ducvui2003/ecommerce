import { OrderBy, SortBy } from '@shared/constants/product.constant';
import { orderBySchema } from '@shared/constants/search.constant';
import { DecimalToNumberSchema } from '@shared/models/base.model';
import { CategoryModel } from '@shared/models/category.model';
import { OptionModel } from '@shared/models/option.model';
import { ProductModel } from '@shared/models/product.model';
import { SupplierModel } from '@shared/models/supplier.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const sortBySchema = z.enum([SortBy.CreatedAt, SortBy.Price, SortBy.Id]);

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
  categoryName: z
    .union([z.string(), z.array(z.string())])
    .transform((val: string | string[] | undefined) => {
      if (val === undefined) return [];

      return Array.isArray(val) ? val : [val];
    })
    .optional(),
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
    .default([`${SortBy.Id}_${OrderBy.Asc}`])
    .transform((val) =>
      val.map((sortString) => {
        const { sortBy, orderBy } = sortString;
        return { sortBy, orderBy };
      }),
    ),
  isDeleted: z
    .union([z.boolean(), z.string(), z.null()])
    .optional()
    .transform((val) => {
      if (val === null || val === undefined) return null;
      if (typeof val === 'boolean') return val;
      const lower = val.toLowerCase();
      if (lower === 'true') return true;
      if (lower === 'false') return false;
      return null; // fallback for unrecognized strings
    }),
});

const ProductResSchema = ProductModel.pick({
  id: true,
  name: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  thumbnail: z.string().optional(),
});

const ProductDetailResSchema = ProductModel.pick({
  id: true,
  name: true,
  description: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  views: z.number(),
  category: CategoryModel.pick({
    id: true,
    name: true,
  }),
  supplier: SupplierModel.pick({
    name: true,
  }),
  thumbnail: z.string().optional(),
  resources: z.array(z.string()).optional(),
  option: z
    .array(
      OptionModel.pick({
        id: true,
        name: true,
      }).extend({
        price: DecimalToNumberSchema,
        resource: z.string().optional(),
      }),
    )
    .optional(),
  liked: z.boolean().default(false),
});

type ProductDetailResType = z.infer<typeof ProductDetailResSchema>;
type ProductResType = z.infer<typeof ProductResSchema>;

export { ProductDetailResSchema, ProductResSchema, SearchProductReqSchema };
export type { ProductDetailResType, ProductResType };
