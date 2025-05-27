import { SePaymentTransactionModel } from '@shared/models/payment-transaction.model';
import { z } from 'zod';

export const WebhookPaymentBodySchema = SePaymentTransactionModel;

export type WebhookPaymentBodyType = z.infer<typeof WebhookPaymentBodySchema>;

export const UrlIPNVnPayBodySchema = z.object({
  responseCode: z.coerce.string(),
  txnRef: z.string(),
  tnnCode: z.string(),
  amount: z.coerce.number(),
  bankCode: z.string(),
  bankTranNo: z.string(),
  cardType: z.string(),
  payDate: z.coerce.date(),
  orderInfo: z.string(),
  transactionNo: z.string(),
  transactionStatus: z.string(),
  secureHash: z.string(),
});

export type UrlIPNVnPayType = z.infer<typeof UrlIPNVnPayBodySchema>;
