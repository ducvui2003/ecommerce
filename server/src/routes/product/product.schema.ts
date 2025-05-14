import { OrderBy, SortBy } from '@shared/constants/product.constant';
import { CategoryModel } from '@shared/models/category.model';
import { MediaType } from '@shared/models/media.model';
import { OptionModel } from '@shared/models/option.model';
import { ProductModel, ProductType } from '@shared/models/product.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
}).extend({
  option: OptionModel.pick({}),
});

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

export { SearchProductReqSchema };
