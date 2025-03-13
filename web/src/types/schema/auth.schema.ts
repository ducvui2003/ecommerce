import z from 'zod';

export const LoginBodyReq = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string(),
});

export type LoginBodyReqType = z.infer<typeof LoginBodyReq>;

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

export const RegisterBodyReq = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    otp: z.string().min(6),
    name: z.string().min(8),
    password: passwordSchema,
    'confirm-password': z.string(),
  })
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Passwords do not match',
    path: ['confirm-password'],
  });

export type RegisterBodyReqType = z.infer<typeof RegisterBodyReq>;

export type RegisterResType = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export const SendOTPReq = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export type SendOTPReqType = z.infer<typeof SendOTPReq>;

export type SendOTPResType = {
  email: string;
  type: TypeOTP;
  expiredAt: Date;
};

export enum TypeOTP {
  'REGISTER',
  'FORGOT_PASSWORD',
}

export const ForgotPasswordReq = z
  .object({
    email: z.string(),
    otp: z.string().min(6),
    password: passwordSchema,
    'confirm-password': z.string(),
  })
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Passwords do not match',
    path: ['confirm-password'],
  });

export type ForgotPasswordType = z.infer<typeof ForgotPasswordReq>;
