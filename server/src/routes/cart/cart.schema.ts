import { CartItemModel } from '@shared/models/cart-item.model';
import { z } from 'zod';

const AddCartItemBodySchema = CartItemModel.pick({
  productId: true,
  optionId: true,
  quantity: true,
}).strict();

const ChangeQuantityCartItemBodySchema = z.object({
  quantity: z.union([
    z.number().int().positive(),
    z.object({ increment: z.number().int().positive() }),
    z.object({ decrement: z.number().int().positive() }),
  ]),
}).strict();

export {
  AddCartItemBodySchema,
  ChangeQuantityCartItemBodySchema
};
