import { z } from 'zod';

export const ReceiverSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  detail: z.string().min(1),
});

export const OrderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
});

export const CreateOrderSchema = z.object({
  userId: z.number().int().positive(),
  totalAmount: z.number().nonnegative(),
  feeShipping: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  receiver: ReceiverSchema,
  orderItem: z.array(OrderItemSchema).min(1),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
