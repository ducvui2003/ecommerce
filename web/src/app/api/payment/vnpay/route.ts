import paymentService from '@/service/payment.service';
import { VnpayReturnSchema } from '@/types/payment.type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryObject = Object.fromEntries(searchParams.entries());
  const query = VnpayReturnSchema.safeParse(queryObject);
  if (!query.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', issues: query.error.issues },
      { status: 400 },
    );
  }
  try {
    const {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_SecureHash,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
    } = query.data;
    const response = await paymentService.vnpaySentToBackend({
      amount: vnp_Amount,
      bankCode: vnp_BankCode,
      bankTranNo: vnp_BankTranNo,
      cardType: vnp_CardType,
      orderInfo: vnp_OrderInfo,
      payDate: vnp_PayDate,
      responseCode: vnp_ResponseCode,
      secureHash: vnp_SecureHash,
      tnnCode: vnp_TmnCode,
      transactionNo: vnp_TransactionNo,
      transactionStatus: vnp_TransactionStatus,
      txnRef: vnp_TxnRef,
    });

    return NextResponse.redirect(new URL('/payment', request.url));
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
