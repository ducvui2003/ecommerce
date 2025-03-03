import { UserModel } from '@shared/models/user.model';
import { VerificationCodeSchema } from '@shared/models/verification-code.model';
import { z } from 'zod';

export const RegisterBodySchema = UserModel.pick({
  email: true,
  name: true,
})
  .extend({
    otp: z.string(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)',
      ),
  })
  .strict();

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;

export const RegisterResSchema = UserModel.pick({
  email: true,
  name: true,
});

export type RegisterResType = z.infer<typeof RegisterResSchema>;

export const LoginBodySchema = UserModel.pick({
  email: true,
  password: true,
}).strict();

export type LoginBodyType = z.infer<typeof LoginBodySchema>;

export const LoginResSchema = UserModel.pick({
  id: true,
  email: true,
  avatar: true,
}).extend({
  avatar: z.optional(z.string()),
  accessToken: z.string(),
  refreshToken: z.string(),
  exp: z.number(),
});

export type LoginResType = z.infer<typeof LoginResSchema>;

export const RefreshReqSchema = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type RefreshReqType = z.infer<typeof RefreshReqSchema>;

export const RefreshResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  exp: z.number(),
});

// Verification
export const SendOTPBodySchema = VerificationCodeSchema.pick({
  email: true,
  type: true,
}).strict();
