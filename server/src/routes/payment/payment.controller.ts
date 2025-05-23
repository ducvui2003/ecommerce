import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  UrlIPNVnPaySchema,
  WebhookPaymentBodyType,
} from '@route/payment/payment.schema';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { WebhookSePayReq } from '@route/payment/payment.dto';
import {
  VN_PAY_PROCESSING,
  VN_PAY_SUCCESS,
} from '@route/payment/payment.constrant';

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

  @Get('vn-pay-return')
  public vnPayReturn(
    @Query('vnp_ResponseCode') responseCode: string,
    @Query('vnp_TxnRef') paymentRef: string,
    @Query('vnp_TmnCode') tmnCode: string,
    @Query('vnp_Amount') amount: string,
    @Query('vnp_BankCode') bankCode: string,
    @Query('vnp_BankTranNo') bankTranNo: string,
    @Query('vnp_CardType') cardType: string,
    @Query('vnp_PayDate') payDate: string,
    @Query('vnp_OrderInfo') orderInfo: string,
    @Query('vnp_TransactionNo') transactionNo: string,
    @Query('vnp_TransactionStatus') transactionStatus: string,
    @Query('vnp_SecureHash') secureHash: string,
  ) {
    this.paymentService.handleUrlIPNVnPay(
      UrlIPNVnPaySchema.parse({
        amount: amount,
        bankCode: bankCode,
        bankTranNo: bankTranNo,
        cardType: cardType,
        orderInfo: orderInfo,
        payDate: payDate,
        responseCode: responseCode,
        secureHash: secureHash,
        tnnCode: tmnCode,
        transactionNo: transactionNo,
        transactionStatus: transactionStatus,
        txnRef: paymentRef,
      }),
    );
  }
}
