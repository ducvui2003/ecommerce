import { PaymentProvider } from '@prisma/client';
import {
  DecimalToNumberSchema,
  NumberToDecimalSchema,
} from '@shared/models/base.model';
import { OrderItemModel } from '@shared/models/order-item.model';
import { OrderModel } from '@shared/models/order.model';
import { ProductOrderItemModel } from '@shared/models/product-order-item.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const ReceiverSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  detail: z.string().min(1),
});

const SearchOrderReqSchema = PageableSchema.extend({});

const CreateOrderSchema = z.object({
  feeShipping: z.coerce.number().nonnegative(),
  receiver: ReceiverSchema,
  cartItemIds: z.array(z.string()).min(1),
  method: z.enum([PaymentProvider.SEPAY, PaymentProvider.VNPAY]),
});

type CreateOrderResType = {
  orderId: number;
  paymentId: number;
  totalAmount: number;
  url: string;
  type: 'QR_CODE' | 'REDIRECT';
};

const OrderResSchema = z.object({
  id: z.number(),
  totalAmount: DecimalToNumberSchema,
  status: z.string(),
  thumbnail: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
});

const OrderDetailResSchema = OrderModel.pick({
  id: true,
  status: true,
  receiver: true,
  createdAt: true,
}).extend({
  totalAmount: DecimalToNumberSchema,
  items: z.array(
    OrderItemModel.pick({
      quantity: true,
    }).merge(ProductOrderItemModel),
  ),
});

type CreateOrderType = z.infer<typeof CreateOrderSchema>;
type OrderResType = z.infer<typeof OrderResSchema>;
type SearchOrderType = z.infer<typeof SearchOrderReqSchema>;
type OrderDetailResType = z.infer<typeof OrderDetailResSchema>;
export {
  CreateOrderSchema,
  OrderResSchema,
  ReceiverSchema,
  SearchOrderReqSchema,
  OrderDetailResSchema,
};
export type {
  CreateOrderResType,
  CreateOrderType,
  OrderResType,
  OrderDetailResType,
  SearchOrderType,
};
