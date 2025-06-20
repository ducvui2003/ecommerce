import { ReviewModel } from '@shared/models/review.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const SendReviewSchema = ReviewModel.pick({
  productId: true,
  orderItemId: true,
  content: true,
  rating: true,
}).strict();

const GetReviewsOfProductQuerySchema = PageableSchema.extend({
  ratings: z
    .preprocess((val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map(Number);
      return [Number(val)];
    }, z.array(z.number())).optional(),
  sort: z.enum(['rating_asc', 'rating_desc', 'rating_newest', 'rating_oldest'])
    .default('rating_newest').optional(),
  onlyHasResponse: z.preprocess(
    (val) => (val === 'true' ? true : val === 'false' ? false : val),
    z.boolean().optional(),
  ),
  onlyHasBuyAgain: z.preprocess(
    (val) => (val === 'true' ? true : val === 'false' ? false : val),
    z.boolean().optional(),
  ),
  search: z.string().optional(),
});

export { SendReviewSchema, GetReviewsOfProductQuerySchema };
