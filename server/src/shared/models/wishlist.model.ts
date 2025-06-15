import { ProductModel } from '@shared/models/product.model';
import { UserModel } from '@shared/models/user.model';
import { z } from 'zod';

const WishlistModel = z.object({
  id: z.number(),
  userId: z.number(),
  user: UserModel.optional(),
  productId: z.number(),
  product: ProductModel.optional(),
  createdAt: z.date().optional(),
});

type WishlistType = z.infer<typeof WishlistModel>;
export { WishlistModel };
export type { WishlistType };
