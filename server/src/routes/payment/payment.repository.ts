import { Injectable } from '@nestjs/common';
import {
  PaymentStatus,
  PaymentStatusType,
} from '@shared/constants/payment.constant';
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

  getUserIdByPaymentId(paymentId: number): Promise<number | null>;
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

  updatePayment(
    paymentId: number,
    status: PaymentStatusType,
  ): Promise<PaymentType> {
    return this.prismaService.payment.update({
      data: {
        status: status,
      },
      where: {
        id: paymentId,
        status: {
          in: [PaymentStatus.PENDING],
        },
      },
    });
  }

  async getUserIdByPaymentId(paymentId: number): Promise<number | null> {
    const data = await this.prismaService.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        order: true,
      },
    });
    return data?.order?.userId ?? null;
  }
}
