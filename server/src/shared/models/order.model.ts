import { z } from 'zod'
import { PaymentModel } from '@shared/models/payment.model';
import { ProductModel } from '@shared/models/product.model';
import { ReceiverModel } from '@shared/models/receiver.model';

export const OrderStatusEnum = z.enum([
  'PENDING',
  'PAID',
  'DELIVERING',
  'DELIVERED',
  'CANCELED',
  'COMPLETE'
])
export type OrderStatus = z.infer<typeof OrderStatusEnum>

export const OrderItemModel = z.object({
  id: z.number(),
  quantity: z.number().int(),
  price: z.number(),
  product: ProductModel,
})

export const OrderModel = z.object({
  id: z.number(),
  totalAmount: z.number(),
  status: OrderStatusEnum,
  receiver: ReceiverModel,

  userId: z.number(),
  orderItem: z.array(OrderItemModel),

  createdAt: z.coerce.date(),

  paymentId: z.number().nullable().optional(),
  payment: PaymentModel.nullish().optional(),
})

export type Order = z.infer<typeof OrderModel>
