import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { PREFIX_PAYMENT_CODE } from '@shared/constants/payment.constant';
import { buildUrl } from '@shared/helper.shared';
import { PaymentService } from '@shared/services/payment/payment.service';

export class SepayPaymentService extends PaymentService {
  constructor(paymentRef: number, price: number) {
    super(paymentRef, price, 'SEPAY');
  }
  generatePaymentUrl(): string {
    const ACCOUNT_NUMBER = envConfig.SEPAY_ACCOUNT_NUMBER;
    const BANK = envConfig.SEPAY_BANK;
    const desc = `${PREFIX_PAYMENT_CODE} ${this.paymentRef}`;

    const params: Record<string, string> = {
      acc: ACCOUNT_NUMBER,
      bank: BANK,
      amount: this.price.toString(),
      des: desc,
    };
    return buildUrl('https://qr.sepay.vn/img', params);
  }
}
