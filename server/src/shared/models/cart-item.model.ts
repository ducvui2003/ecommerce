import { TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';
import { ProductModel } from '@shared/models/product.model';
import { CartModel } from '@shared/models/cart.model';
import { OptionModel } from '@shared/models/option.model';

export const CartItemModel = TimestampFields.extend({
  id: z.string(),
  quantity: z.number().int().positive(),
  productId: z.number().int().positive(),
  product: ProductModel.optional(),
  cartId: z.number().int().positive(),
  cart: CartModel.optional(),
  optionId: z.number().int().positive().optional(),
  option: OptionModel.optional(),
  selected: z.boolean().default(true),
});

export type CartItemType = z.infer<typeof CartItemModel>;
