import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '@route/payment/payment.repository';
import { WebhookPaymentBodyType } from '@route/payment/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
  ) {}

  receiver(body: WebhookPaymentBodyType) {
    this.paymentRepository.receiver(body);
  }
}
