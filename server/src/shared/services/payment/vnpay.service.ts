import envConfig from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { VNPAY } from '@shared/constants/payment.constant';
import { PaymentService } from '@shared/services/payment/payment.service';
import crypto from 'crypto';
import { addMinutes, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import qs from 'qs';

export class VnpayPaymentService extends PaymentService {
  private ipArr: string;
  constructor(paymentRef: number, price: number, ipArr: string) {
    super(paymentRef, price, 'VNPAY');
    this.ipArr = ipArr;
  }
  generatePaymentUrl(): string {
    const tmnCode = envConfig.VNPAY_TNN_CODE;
    const secretKey = envConfig.VNPAY_HASH_SECRET;
    let vnpUrl = envConfig.VNPAY_PAY_URL;
    const returnUrl = envConfig.VNPAY_PAY_RETURN_URL;

    const timeZone = 'Asia/Ho_Chi_Minh';
    const now = new Date();

    const createDate = formatInTimeZone(now, timeZone, 'yyyyMMddHHmmss');
    const expireDate = formatInTimeZone(
      addMinutes(now, 15),
      timeZone,
      'yyyyMMddHHmmss',
    );

    const orderInfo = 'HD: ' + this.paymentRef;
    const orderType = VNPAY.ORDER_TYPE;

    const currCode = VNPAY.CURR_CODE;
    const vnp_Params: Record<string, string> = {};
    vnp_Params['vnp_Amount'] = (this.price * 100).toString();
    vnp_Params['vnp_Command'] = VNPAY.COMMAND;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_IpAddr'] = this.ipArr;
    vnp_Params['vnp_Locale'] = VNPAY.LOCALE;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType.toString();
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_ExpireDate'] = expireDate;
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_TxnRef'] = this.paymentRef.toString();
    vnp_Params['vnp_Version'] = VNPAY.VERSION;

    const params = new URLSearchParams();
    Object.entries(vnp_Params)
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .forEach(([key, value]) => {
        if (!value) return;
        params.append(key, value.toString());
      });

    // Create hash
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac
      .update(Buffer.from(params.toString(), 'utf-8'))
      .digest('hex');
    params.append('vnp_SecureHash', signed);
    // Build redirect URL
    vnpUrl += '?' + params.toString();

    return vnpUrl;
  }
}
