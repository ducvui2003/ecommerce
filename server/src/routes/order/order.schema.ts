import { PaymentProvider } from '@prisma/client';
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

export const CreateOrderSchema = z.object({
  feeShipping: z.coerce.number().nonnegative(),
  receiver: ReceiverSchema,
  cartItemIds: z.array(z.string()).min(1),
  method: z.enum([PaymentProvider.SEPAY, PaymentProvider.VNPAY]),
});

type CreateOrderResType = {
  paymentId: number;
  totalAmount: number;
  url: string;
  type: 'QR_CODE' | 'REDIRECT';
};
type CreateOrderType = z.infer<typeof CreateOrderSchema>;
export type { CreateOrderResType, CreateOrderType };
