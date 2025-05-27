import { Injectable } from '@nestjs/common';
import { PaymentStatusType } from '@shared/constants/payment.constant';
import { PaymentTransactionType } from '@shared/models/payment-transaction.model';
import { PaymentType } from '@shared/models/payment.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface PaymentRepository {
  createPaymentTransaction(
    body: Omit<PaymentTransactionType, 'id' | 'createdAt'>,
  ): Promise<PaymentTransactionType>;

  updatePayment(
    paymentId: number,
    status: PaymentStatusType,
  ): Promise<PaymentType>;
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

  updatePayment(paymentId: number, status: PaymentStatusType) {
    return this.prismaService.payment.update({
      data: {
        status: status,
      },
      where: {
        id: paymentId,
      },
    });
  }
}
