import { NumberToDecimalSchema } from '@shared/models/base.model';
import { z } from 'zod';

const PaymentProvider = {
  SEPAY: 'SEPAY',
  VNPAY: 'VNPAY',
} as const;

const SePaymentTransactionModel = z.object({
  id: z.number(),
  gateway: z.string(),
  transactionDate: z.coerce.date(),
  accountNumber: z.string(),
  code: z.string().nullable(),
  content: z.string(),
  transferType: z.enum(['in', 'out']),
  transferAmount: z.number(),
  accumulated: z.number(),
  subAccount: z.string().nullable(),
  referenceCode: z.string().nullable(),
  description: z.string().nullable(),
});

type SePaymentTransactionType = z.infer<typeof SePaymentTransactionModel>;

const VnPayPaymentTransactionModel = z.object({
  responseCode: z.string(),
  txnRef: z.string(),
  tnnCode: z.string(),
  amount: z.number(),
  bankCode: z.string(),
  bankTranNo: z.string(),
  cardType: z.string(),
  payDate: z.string(),
  orderInfo: z.string(),
  transactionNo: z.string(),
  transactionStatus: z.string(),
});
type VnPayPaymentTransactionType = z.infer<typeof VnPayPaymentTransactionModel>;

const PaymentTransactionModel = z.object({
  id: z.number(),
  paymentId: z.number().nullable(),
  provider: z.enum(['SEPAY', 'VNPAY']),
  providerPaymentId: z.string(),
  amount: NumberToDecimalSchema,
  payload: z.union([SePaymentTransactionModel, VnPayPaymentTransactionModel]),
  createdAt: z.coerce.date(),
});
type PaymentTransactionType = z.infer<typeof PaymentTransactionModel>;

export {
  SePaymentTransactionModel,
  VnPayPaymentTransactionModel,
  PaymentTransactionModel,
};

export type {
  VnPayPaymentTransactionType,
  SePaymentTransactionType,
  PaymentTransactionType,
};
