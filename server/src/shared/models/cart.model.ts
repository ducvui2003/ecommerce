import { TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';
import { UserModel } from '@shared/models/user.model';
import { CartItemModel } from '@shared/models/cart-item.model';

export const CartModel = TimestampFields.extend({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  rating: z.number().int().positive(),
  user: UserModel.optional(),
  cartItems: z.array(CartItemModel).optional(),
});

export type CartType = z.infer<typeof CartModel>;
