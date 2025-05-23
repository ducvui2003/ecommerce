import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UrlIPNVnPayDto, WebhookSePayReq } from '@route/payment/payment.dto';
import { PaymentService } from '@route/payment/payment.service';
import { AuthType } from '@shared/constants/auth.constant';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/payment')
export class PaymentController {
  constructor(@Inject() private readonly paymentService: PaymentService) {}

  @Post('receiver')
  @UseGuards(AuthenticationGuard)
  @Auth([AuthType.APIKey])
  receiverWebhookSepay(@Body() body: WebhookSePayReq) {
    console.log(body);
    this.paymentService.handleWebhookSepay(body);
  }

  @Post('vn-pay-return')
  public vnPayReturn(@Body() body: UrlIPNVnPayDto) {
    this.paymentService.handleUrlIPNVnPay(body);
  }
}
