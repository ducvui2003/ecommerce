import { SePaymentTransactionModel } from '@shared/models/payment-transaction.model';
import { z } from 'zod';

export const WebhookPaymentBodySchema = SePaymentTransactionModel;

export type WebhookPaymentBodyType = z.infer<typeof WebhookPaymentBodySchema>;

export const UrlIPNVnPaySchema = z.object({
  responseCode: z.coerce.string(),
  txnRef: z.string(),
  tnnCode: z.string(),
  amount: z.coerce.number(),
  bankCode: z.string(),
  bankTranNo: z.string(),
  cardType: z.string(),
  payDate: z.coerce
    .string()
    .regex(/^\d{14}$/, 'Must be in yyyyMMddHHmmss format')
    .transform((val) => {
      const year = parseInt(val.slice(0, 4), 10);
      const month = parseInt(val.slice(4, 6), 10) - 1; // Month is 0-indexed
      const day = parseInt(val.slice(6, 8), 10);
      const hour = parseInt(val.slice(8, 10), 10);
      const minute = parseInt(val.slice(10, 12), 10);
      const second = parseInt(val.slice(12, 14), 10);

      return new Date(year, month, day, hour, minute, second);
    }),
  orderInfo: z.string(),
  transactionNo: z.string(),
  transactionStatus: z.string(),
  secureHash: z.string(),
});

export type UrlIPNVnPayType = z.infer<typeof UrlIPNVnPaySchema>;
