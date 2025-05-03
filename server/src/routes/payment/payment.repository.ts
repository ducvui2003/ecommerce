import { BadRequestException, Injectable } from '@nestjs/common';
import { WebhookPaymentBodyType } from '@route/payment/payment.schema';
import { PREFIX_PAYMENT_CODE } from '@shared/constants/payment.constaint';
import { PrismaService } from '@shared/services/prisma.service';

export interface PaymentRepository {
  receiver: (body: WebhookPaymentBodyType) => Promise<void>;
}

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async receiver(body: WebhookPaymentBodyType): Promise<void> {
    // 1. Create payment transaction
    let amountIn = 0;
    let amountOut = 0;

    if (body.transferType === 'out') {
      amountIn = Number(body.transferAmount);
    } else {
      amountOut = Number(body.transferAmount);
    }
    await this.prismaService.paymentTransaction.create({
      data: {
        gateway: body.gateway,
        transactionDate: body.transactionDate,
        accountNumber: body.accountNumber,
        code: body.code,
        transactionContent: body.content,
        amountIn,
        amountOut,
        accumulated: Number(body.accumulated),
        subAccount: body.subAccount,
        referenceNumber: body.referenceCode,
        body: body.description,
      },
    });
    const paymentId = body.code
      ? Number(body.code.split(PREFIX_PAYMENT_CODE)[1])
      : Number(body.content.split(PREFIX_PAYMENT_CODE)[1]);
    // if (isNaN(paymentId)) {
    //   throw new BadRequestException('Cannot get payment id from content');
    // }

    // 2. Check payment id exist in database payment

    // 3. Calculate total price of order is same with amountIn

    // 4. Update status in payment and order
  }
}
