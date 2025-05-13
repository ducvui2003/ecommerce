import { PaymentStatus } from '@prisma/client';
import { TimestampFields } from '@shared/models/base.model';
import { z } from 'zod';

const PaymentModel = TimestampFields.extend({
  id: z.number(),
  orderId: z.number(),
  status: z.enum([
    PaymentStatus.FAILED,
    PaymentStatus.PENDING,
    PaymentStatus.SUCCESS,
  ]),
});

export type PaymentType = z.infer<typeof PaymentModel>;

export { PaymentModel };
