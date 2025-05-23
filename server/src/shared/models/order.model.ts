import { z } from 'zod';
import { PaymentModel } from '@shared/models/payment.model';
import { ProductModel } from '@shared/models/product.model';
import { ReceiverModel } from '@shared/models/receiver.model';
import { NumberToDecimalSchema } from '@shared/models/base.model';
import { OrderItemModel } from '@shared/models/order-item.model';

export const OrderStatusEnum = z.enum([
  'PENDING',
  'PAID',
  'DELIVERING',
  'DELIVERED',
  'CANCELED',
  'COMPLETE',
]);
export type OrderStatus = z.infer<typeof OrderStatusEnum>;

export const OrderModel = z.object({
  id: z.number(),
  totalAmount: NumberToDecimalSchema,
  feeShipping: NumberToDecimalSchema,
  status: OrderStatusEnum,
  receiver: ReceiverModel,

  userId: z.number(),
  orderItem: z.array(OrderItemModel).optional(),

  createdAt: z.coerce.date(),

  payment: PaymentModel.optional(),
});

export type OrderType = z.infer<typeof OrderModel>;
