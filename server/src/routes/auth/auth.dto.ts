import {
  ForgetPasswordSchema,
  LoginBodySchema,
  RefreshReqSchema,
  RegisterBodySchema,
  SendOTPBodySchema,
  verifyOTPBodySchema,
} from '@route/auth/auth.schema';
import { createZodDto } from 'nestjs-zod';

export class RegisterReqDTO extends createZodDto(RegisterBodySchema) {}

export class LoginReqDTO extends createZodDto(LoginBodySchema) {}

export class RefreshReqDTO extends createZodDto(RefreshReqSchema) {}

export class LogoutReqDTO extends RefreshReqDTO {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

export class VerifyOTPBodyDTO extends createZodDto(verifyOTPBodySchema) {}

export class ForgetPasswordBodyDTO extends createZodDto(ForgetPasswordSchema) {}
