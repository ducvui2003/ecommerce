import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '@route/payment/payment.repository';
import {
  UrlIPNVnPayType,
  WebhookPaymentBodyType,
} from '@route/payment/payment.schema';
import { SHARED_ORDER_REPOSITORY } from '@shared/constants/dependency.constant';
import { PREFIX_PAYMENT_CODE, VNPAY } from '@shared/constants/payment.constant';
import { toDecimalSchema } from '@shared/helper.shared';
import {
  PaymentTransactionType,
  SePaymentTransactionModel,
  VnPayPaymentTransactionModel,
} from '@shared/models/payment-transaction.model';
import { SharedOrderRepository } from '@shared/repositories/shared-order.repository';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
    @Inject(SHARED_ORDER_REPOSITORY)
    private readonly sharedOrderRepository: SharedOrderRepository,
  ) {}

  async handleWebhookSepay(body: WebhookPaymentBodyType) {
    // 1. Create payment transaction
    const paymentId = body.code
      ? Number(body.code.split(PREFIX_PAYMENT_CODE)[1])
      : Number(body.content.split(PREFIX_PAYMENT_CODE)[1]);

    if (isNaN(paymentId)) {
      throw new BadRequestException('Cannot get payment id from content');
    }

    let amount;

    if (body.transferType === 'out') {
      amount = -1 * Number(body.transferAmount);
    } else {
      amount = Number(body.transferAmount);
    }

    const providerPaymentId = body.id.toString();

    const payload = SePaymentTransactionModel.parse(body);

    const paymentTransaction: PaymentTransactionType =
      await this.paymentRepository.createPaymentTransaction({
        paymentId: paymentId,
        providerPaymentId: providerPaymentId,
        payload: payload,
        amount: amount,
      });

    // 2. Check payment id exist in database payment

    // 3. Calculate total price of order is same with amountIn

    // 4. Update status in payment and order
  }

  async handleUrlIPNVnPay(body: UrlIPNVnPayType) {
    // 1. Create payment transaction
    const paymentId = parseInt(body.txnRef);
    const providerPaymentId = body.transactionNo;
    const amount = body.amount;
    const payload = VnPayPaymentTransactionModel.parse(body);

    await this.paymentRepository.createPaymentTransaction({
      paymentId: paymentId,
      providerPaymentId: providerPaymentId,
      payload: payload,
      amount: toDecimalSchema(amount),
    });

    // 2. Find payment with payment ref & Update status in Payment
    if (body.responseCode === VNPAY.SUCCESS_CODE) {
      const payment = await this.paymentRepository.updatePayment(
        paymentId,
        'SUCCESS',
      );
      // 3. Update status in Order
      this.sharedOrderRepository.updateStatusOrder(payment.orderId, 'PAID');
    } else {
      await this.paymentRepository.updatePayment(paymentId, 'FAILED');
    }
  }
}
