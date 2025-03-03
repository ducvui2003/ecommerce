import { VerificationType } from '@shared/constants/auth.constant';
import { z } from 'zod';

export const VerificationCodeSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  code: z.string(),
  type: z.enum([VerificationType.REGISTER, VerificationType.FORGOT_PASSWORD]),
  expiredAt: z.date(),
  createdAt: z.date(),
});

export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
