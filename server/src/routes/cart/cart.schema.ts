import { CartItemModel } from '@shared/models/cart-item.model';

const AddCartItemBodySchema = CartItemModel.pick({
  productId: true,
  quantity: true,
}).strict();

const ChangeQtyCartItemBodySchema = CartItemModel.pick({
  quantity: true,
}).strict()

export { AddCartItemBodySchema, ChangeQtyCartItemBodySchema };