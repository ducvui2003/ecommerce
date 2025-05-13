import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaPaymentRepository } from '@route/payment/payment.repository';

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
