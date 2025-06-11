import {
  ChangePasswordSchema,
  ForgetPasswordSchema,
  LoginBodySchema,
  RefreshReqSchema,
  RegisterBodySchema,
  SendOTPBodySchema,
  VerifyOTPBodySchema,
} from '@route/auth/auth.schema';
import { createZodDto } from 'nestjs-zod';

export class RegisterReqDTO extends createZodDto(RegisterBodySchema) {}

export class LoginReqDTO extends createZodDto(LoginBodySchema) {}

export class RefreshReqDTO extends createZodDto(RefreshReqSchema) {}

export class LogoutReqDTO extends RefreshReqDTO {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

export class VerifyOTPBodyDTO extends createZodDto(VerifyOTPBodySchema) {}

export class ForgetPasswordBodyDTO extends createZodDto(ForgetPasswordSchema) {}

export class ChangePasswordBodyDTO extends createZodDto(ChangePasswordSchema) {}
