import {
  PaymentProvider,
  PaymentStatus,
} from '@shared/constants/payment.constant';
import { TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';

const PaymentModel = TimestampFields.extend({
  id: z.number(),
  orderId: z.number().nullable(),
  status: z
    .enum([PaymentStatus.FAILED, PaymentStatus.PENDING, PaymentStatus.SUCCESS])
    .default(PaymentStatus.PENDING),
  provider: z.enum([PaymentProvider.SEPAY, PaymentProvider.VNPAY]),
});

export type PaymentType = z.infer<typeof PaymentModel>;

export { PaymentModel };
