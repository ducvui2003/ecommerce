import { z } from 'zod';
import { PaymentModel } from '@shared/models/payment.model';
import { ReceiverModel } from '@shared/models/receiver.model';
import { NumberToDecimalSchema } from '@shared/models/base.model';
import { OrderItemModel } from '@shared/models/order-item.model';
import { OrderStatus } from '@shared/constants/order.constant';

export const OrderModel = z.object({
  id: z.number(),
  totalAmount: NumberToDecimalSchema,
  feeShipping: NumberToDecimalSchema,
  status: z.enum([
    OrderStatus.PENDING,
    OrderStatus.PAID,
    OrderStatus.DELIVERING,
    OrderStatus.COMPLETE,
    OrderStatus.CANCELED,
  ]),
  receiver: ReceiverModel,

  userId: z.number(),
  orderItem: z.array(OrderItemModel).optional(),

  createdAt: z.coerce.date(),

  payment: PaymentModel.optional(),
});

export type OrderType = z.infer<typeof OrderModel>;
