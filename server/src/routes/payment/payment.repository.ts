import { Injectable } from '@nestjs/common';
import { PaymentTransactionType } from '@shared/models/payment-transaction.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface PaymentRepository {
  createPaymentTransaction(
    body: Omit<PaymentTransactionType, 'id' | 'createdAt'>,
  ): Promise<PaymentTransactionType>;
}

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  createPaymentTransaction(
    data: Omit<PaymentTransactionType, 'id' | 'createdAt'>,
  ): Promise<PaymentTransactionType> {
    return this.prismaService.paymentTransaction.create({
      data: data,
    });
  }
}
