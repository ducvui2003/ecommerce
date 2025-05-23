import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '@route/payment/payment.repository';
import {
  UrlIPNVnPayType,
  WebhookPaymentBodyType,
} from '@route/payment/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
  ) {}

  handleWebhookSepay(body: WebhookPaymentBodyType) {
    this.paymentRepository.handleWebhookSepay(body);
  }

  handleUrlIPNVnPay(body: UrlIPNVnPayType) {
    if (body.responseCode) {
    }
  }
}
