import { Injectable } from '@nestjs/common';
import { PaymentStatus, Prisma } from '@prisma/client';
import { PaymentModel, PaymentType } from '@shared/models/payment.model';
import { PrismaService } from '@shared/services/prisma.service';

export interface SharedPaymentRepository {
  createPayment(
    data: Pick<PaymentType, 'orderId' | 'provider'>,
    tx?: Prisma.TransactionClient,
  ): Promise<PaymentType>;

  findPaymentById(id: number): Promise<PaymentType | null>;

  updatePaymentStatus(id: number, status: PaymentStatus);
}
@Injectable()
export class SharedPrismaPaymentRepository implements SharedPaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createPayment(
    data: Pick<PaymentType, 'orderId' | 'provider' | 'status'>,
    tx?: Prisma.TransactionClient,
  ): Promise<PaymentType> {
    if (tx) {
      return tx.payment.create({
        data: data,
      });
    } else {
      return this.prismaService.payment.create({ data: data });
    }
  }

  findPaymentById(id: number): Promise<PaymentType | null> {
    return this.prismaService.payment.findUnique({
      where: {
        id: id,
      },
    });
  }

  updatePaymentStatus(id: number, status: PaymentStatus) {
    return this.prismaService.payment.update({
      data: {
        status: status,
      },
      where: {
        id: id,
      },
    });
  }
}
