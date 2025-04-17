import { UserModel } from '@shared/models/user.model';
import { VerificationCodeSchema } from '@shared/models/verification-code.model';
import { z } from 'zod';

const PasswordSchema = z
  .string()
  .min(8, ' Mật khẩu tối thiểu 8 ký tự')
  .regex(/[A-Z]/, 'Mật khẩu có tối thiểu 1 ký tự viết hoa')
  .regex(/[a-z]/, 'Mật khẩu có tối thiểu 1 ký tự viết thường')
  .regex(/[0-9]/, 'Mật khẩu có tối thiểu 1 chữ số')
  .regex(/[@$!%*?&]/, 'Mật khẩu có tối thiêu 1 ký tự đặc biệt (@$!%*?&)');

export const RegisterBodySchema = UserModel.pick({
  email: true,
  name: true,
})
  .extend({
    otp: z.string(),
    password: PasswordSchema,
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

export const verifyOTPBodySchema = VerificationCodeSchema.pick({
  email: true,
  code: true,
  type: true,
}).strict();

export const ForgetPasswordSchema = UserModel.pick({
  email: true,
})
  .extend({
    otp: z.string(),
    password: PasswordSchema,
  })
  .strict();
