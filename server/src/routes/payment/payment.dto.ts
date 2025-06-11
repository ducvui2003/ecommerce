import {
  UrlIPNVnPayBodySchema,
  WebhookPaymentBodySchema,
} from '@route/payment/payment.schema';
import { createZodDto } from 'nestjs-zod';

export class WebhookSePayReq extends createZodDto(WebhookPaymentBodySchema) {}
export class UrlIPNVnPayDto extends createZodDto(UrlIPNVnPayBodySchema) {}
