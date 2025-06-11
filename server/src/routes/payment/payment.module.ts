import { Module } from '@nestjs/common';
import { PaymentController } from '@route/payment/payment.controller';
import { PrismaPaymentRepository } from '@route/payment/payment.repository';
import { PaymentService } from '@route/payment/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentRepository',
      useClass: PrismaPaymentRepository,
    },
  ],
})
export class PaymentModule {}
