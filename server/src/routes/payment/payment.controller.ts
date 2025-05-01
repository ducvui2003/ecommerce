import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { WebhookPaymentBodyType } from '@route/payment/payment.schema';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { WebhookSePayReq } from '@route/payment/payment.dto';

@Controller('/api/v1/payment')
export class PaymentController {
  constructor(@Inject() private readonly paymentService: PaymentService) {}

  @Post('receiver')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.APIKey])
  receiverWebhookSepay(@Body() body: WebhookSePayReq) {
    this.paymentService.receiver(body);
  }
}
