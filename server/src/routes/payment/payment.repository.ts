import { Injectable } from '@nestjs/common';
import {
  UrlIPNVnPayType,
  WebhookPaymentBodyType,
} from '@route/payment/payment.schema';
import { PREFIX_PAYMENT_CODE } from '@shared/constants/payment.constant';
import {
  PaymentTransactionType,
  SePaymentTransactionModel,
} from '@shared/models/payment-transaction.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface PaymentRepository {
  handleWebhookSepay: (body: WebhookPaymentBodyType) => Promise<void>;
}

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async handleWebhookSepay(body: WebhookPaymentBodyType): Promise<void> {
    // 1. Create payment transaction
    const paymentId = body.code
      ? Number(body.code.split(PREFIX_PAYMENT_CODE)[1])
      : Number(body.content.split(PREFIX_PAYMENT_CODE)[1]);

    let amount;

    if (body.transferType === 'out') {
      amount = -1 * Number(body.transferAmount);
    } else {
      amount = Number(body.transferAmount);
    }

    const providerPaymentId = body.id.toString();

    const payload = SePaymentTransactionModel.parse(body);

    const paymentTransaction: PaymentTransactionType =
      await this.prismaService.paymentTransaction.create({
        data: {
          paymentId: paymentId,
          provider: 'SEPAY',
          providerPaymentId: providerPaymentId,
          payload: payload,
          amount: amount,
        },
      });

    console.log(paymentTransaction);

    // if (isNaN(paymentId)) {
    //   throw new BadRequestException('Cannot get payment id from content');
    // }

    // 2. Check payment id exist in database payment

    // 3. Calculate total price of order is same with amountIn

    // 4. Update status in payment and order
  }

  async handleUrlIPNVnPay(data: UrlIPNVnPayType) {}
}
