import { PaymentProvider } from '@prisma/client';

export abstract class PaymentService {
  protected paymentRef: number;
  protected price: number;
  protected provider: PaymentProvider;
  constructor(paymentRef: number, price: number, provider: PaymentProvider) {
    this.paymentRef = paymentRef;
    this.price = price;
    this.provider = provider;
  }
  abstract generatePaymentUrl(): string;
}
