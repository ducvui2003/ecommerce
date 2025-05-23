import paymentService from '@/service/payment.service';
import { VnpayReturnSchema } from '@/types/payment.type';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = VnpayReturnSchema.safeParse(searchParams.entries());
  if (!query.data) return;
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

  return NextResponse.redirect(`/payment-result`);
};

export default { GET };
