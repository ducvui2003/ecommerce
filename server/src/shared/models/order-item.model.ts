import { NumberToDecimalSchema } from '@shared/models/base.model';
import { ProductOrderItemModel } from '@shared/models/product-order-item.model';
import { z } from 'zod';

export const OrderItemModel = z.object({
  id: z.number(),
  quantity: z.number().positive().int(),
  price: NumberToDecimalSchema,
  orderId: z.number(),
  product: ProductOrderItemModel,
});
export type OrderItemType = z.infer<typeof OrderItemModel>;
