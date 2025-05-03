import { z } from 'zod';

export const WebhookPaymentBodySchema = z.object({
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
export type WebhookPaymentBodyType = z.infer<typeof WebhookPaymentBodySchema>;
