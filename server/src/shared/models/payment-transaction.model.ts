import { z } from 'zod';

const PaymentTransactionModel = z.object({
  id: z.number(),
  gateway: z.string().nullable(),
  transactionDate: z.date().nullable(),
  accountNumber: z.string().nullable(),
  subAccount: z.string().nullable(),
  amountIn: z.number(),
  amountOut: z.number(),
  code: z.string(),
  transactionContent: z.string(),
  referenceNumber: z.string(),
  body: z.string(),
  createdAt: z.date(),
});

export type PaymentTransactionType = z.infer<typeof PaymentTransactionModel>;

export { PaymentTransactionModel };
