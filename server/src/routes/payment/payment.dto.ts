import { WebhookPaymentBodySchema } from '@route/payment/payment.schema';
import { createZodDto } from 'nestjs-zod';

export class WebhookSePayReq extends createZodDto(WebhookPaymentBodySchema) {}
