import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { VNPAY } from '@shared/constants/payment.constant';
import { PaymentService } from '@shared/services/payment/payment.service';
import crypto from 'crypto';
import { format } from 'date-fns';
import qs from 'qs';

@Injectable()
export class VnpayPaymentService extends PaymentService {
  private ipArr: string;
  constructor(paymentRef: string, price: number, ipArr: string) {
    super(paymentRef, price, 'VNPAY');
    this.ipArr = ipArr;
  }
  generatePaymentUrl(): string {
    const tmnCode = envConfig.VNPAY_TNN_CODE;
    const secretKey = envConfig.VNPAY_HASH_SECRET;
    let vnpUrl = envConfig.VNPAY_PAY_URL;
    const returnUrl = envConfig.VNPAY_PAY_RETURN_URL;

    const now = new Date();

    const createDate = format(now, 'yyyyMMddHHmmss');

    const orderInfo = 'Thanh toán đơn hàng:' + this.paymentRef;
    const orderType = VNPAY.ORDER_TYPE;

    const currCode = VNPAY.CURR_CODE;
    let vnp_Params: Record<string, string> = {};
    vnp_Params['vnp_Version'] = VNPAY.VERSION;
    vnp_Params['vnp_Command'] = VNPAY.COMMAND;
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = VNPAY.LOCALE;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = this.paymentRef;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType.toString();
    vnp_Params['vnp_Amount'] = (this.price * 100).toString();
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = this.ipArr;
    vnp_Params['vnp_CreateDate'] = createDate;

    // Sort params
    vnp_Params = this.sortObject(vnp_Params);

    // Create hash
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    // Build redirect URL
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    return vnpUrl;
  }

  private sortObject(obj: Record<string, string>): Record<string, string> {
    const sorted: Record<string, string> = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }
}
