import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { PaymentRepository } from '@route/payment/payment.repository';
import {
  UrlIPNVnPayType,
  WebhookPaymentBodyType,
} from '@route/payment/payment.schema';
import { SHARED_ORDER_REPOSITORY } from '@shared/constants/dependency.constant';
import { PREFIX_PAYMENT_CODE, VNPAY } from '@shared/constants/payment.constant';
import { toDecimalSchema } from '@shared/helper.shared';
import {
  SePaymentTransactionModel,
  VnPayPaymentTransactionModel,
} from '@shared/models/payment-transaction.model';
import { SharedOrderRepository } from '@shared/repositories/shared-order.repository';
import { WebsocketService } from '@shared/services/websocket.service';
import { Server } from 'socket.io';
@Injectable()
@WebSocketGateway({
  namespace: 'payment',
  cors: {
    origin: '*', // adjust as needed
  },
})
export class PaymentService {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
    @Inject(SHARED_ORDER_REPOSITORY)
    @Inject()
    private readonly sharedOrderRepository: SharedOrderRepository,
    @Inject()
    private readonly websocketService: WebsocketService,
  ) {}

  async handleWebhookSepay(body: WebhookPaymentBodyType) {
    // 1. Create payment transaction
    const paymentId = body.code
      ? Number(body.code.split(PREFIX_PAYMENT_CODE)[1])
      : Number(body.content.split(PREFIX_PAYMENT_CODE)[1]);
    Logger.log(`Payment ID extracted: ${paymentId}`, 'PaymentService');
    if (isNaN(paymentId)) {
      throw new BadRequestException('Cannot get payment id from content');
    }

    let amount;

    if (body.transferType === 'out') {
      amount = -1 * Number(body.transferAmount);
    } else {
      amount = Number(body.transferAmount);
    }

    const providerPaymentId = body.id.toString();

    const payload = SePaymentTransactionModel.parse(body);

    await this.paymentRepository.createPaymentTransaction({
      paymentId: paymentId,
      providerPaymentId: providerPaymentId,
      payload: payload,
      amount: amount,
    });

    let payment;
    try {
      // 2. Check payment id exist in database payment
      payment = await this.paymentRepository.updatePayment(
        paymentId,
        'SUCCESS',
      );
    } catch (error) {
      throw new BadRequestException('Payment not found');
    }

    // 3. Update status in Order
    await this.sharedOrderRepository.updateStatusOrder(payment.orderId, 'PAID');

    // 4. Get userId from payment
    const userId = await this.paymentRepository.getUserIdByPaymentId(paymentId);
    if (!userId) {
      throw new BadRequestException('User not found for this payment');
    } else
      //Websocket
      this.emitEvent(userId);
  }

  private async emitEvent(userId: number) {
    const websocketId = await this.websocketService.getPaymentListener(userId);
    console.log(
      `Emitting payment event to user ${userId} with websocketId ${websocketId}`,
    );
    if (!websocketId) {
      return;
    }
    try {
      this.server.to(websocketId.toString()).emit('paymentEvent', {
        message: 'Payment event received',
        status: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleUrlIPNVnPay(body: UrlIPNVnPayType) {
    // 1. Create payment transaction
    const paymentId = parseInt(body.txnRef);
    const providerPaymentId = body.transactionNo;
    const amount = body.amount;
    const payload = VnPayPaymentTransactionModel.parse(body);

    await this.paymentRepository.createPaymentTransaction({
      paymentId: paymentId,
      providerPaymentId: providerPaymentId,
      payload: payload,
      amount: toDecimalSchema(amount),
    });

    // 2. Find payment with payment ref & Update status in Payment
    if (body.responseCode === VNPAY.SUCCESS_CODE) {
      const payment = await this.paymentRepository.updatePayment(
        paymentId,
        'SUCCESS',
      );
      // 3. Update status in Order
      if (payment.orderId)
        this.sharedOrderRepository.updateStatusOrder(payment.orderId, 'PAID');
    }
    // else {
    //   await this.paymentRepository.updatePayment(paymentId, 'FAILED');
    // }
  }
}
