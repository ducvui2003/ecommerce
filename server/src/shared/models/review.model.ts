import { MetadataFields } from '@shared/models/base.model';
import { z } from 'zod';
import { UserModel, UserType } from '@shared/models/user.model';
import { ProductModel } from '@shared/models/product.model';
import { OrderItemModel, OrderItemType } from '@shared/models/order-item.model';

export const ReviewModel = MetadataFields.extend({
  id: z.number().int().positive(),
  content: z.string(),
  rating: z.number().int().positive(),
  userId: z.number().int().positive(),
  user: UserModel.optional(),
  productId: z.number().int().positive(),
  product: ProductModel.optional(),
  orderItemId: z.number().int().positive(),
  orderItem: OrderItemModel.optional(),
  response: z.string().nullable(),
})

type ReviewType = z.infer<typeof ReviewModel>;

type ReviewItemType = Omit<ReviewType, 'user' | 'orderItem'> &  {
  user: Pick<UserType, 'name' | 'avatar'>
} & Pick<OrderItemType['product'], 'options'>


export type { ReviewType , ReviewItemType};