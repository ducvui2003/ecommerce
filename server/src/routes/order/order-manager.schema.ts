import { OrderStatus, SortBy } from '@shared/constants/order.constant';
import { OrderBy, orderBySchema } from '@shared/constants/search.constant';
import { PageableSchema } from '@shared/types/request.type';
import { string, z } from 'zod';

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

const SearchOrderManagerReqSchema = PageableSchema.extend({
  id: z.string().optional(),
  nameUser: z.string().optional(),
  nameReceiver: z.string().optional(),
  phoneReceiver: z.string().optional(),
  date: z
    .object({
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
    })
    .optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  sorts: z
    .preprocess((val) => {
      // normalize to array
      if (typeof val === 'string') return [val];
      if (Array.isArray(val)) return val;
      return []; // fallback
    }, z.array(sortSchema))
    .default([`${SortBy.CreatedAt}_${OrderBy.Asc}`]),
});

type SearchOrderType = z.infer<typeof SearchOrderManagerReqSchema>;

export { SearchOrderManagerReqSchema };
export type { SearchOrderType };
