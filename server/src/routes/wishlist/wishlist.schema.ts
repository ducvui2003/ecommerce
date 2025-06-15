import { DecimalToNumberSchema } from '@shared/models/base.model';
import { ProductModel } from '@shared/models/product.model';
import { WishlistModel } from '@shared/models/wishlist.model';
import { z } from 'zod';

const CreateWishlistSchema = z.object({
  productId: z.number().positive(),
});

type CreateWishlistType = z.infer<typeof CreateWishlistSchema>;

const ProductResSchema = ProductModel.pick({
  id: true,
  name: true,
}).extend({
  basePrice: DecimalToNumberSchema,
  salePrice: DecimalToNumberSchema,
  thumbnail: z.string().optional(),
});

const WishlistResSchema = WishlistModel.pick({
  id: true,
}).extend({
  product: ProductResSchema,
});

type WishlistResType = z.infer<typeof WishlistResSchema>;

export type { CreateWishlistType, WishlistResType };
export { CreateWishlistSchema, WishlistResSchema, ProductResSchema };
