export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

// Mã danh mục hàng hóa
export const VNPAY: Readonly<Record<string, string>> = {
  ORDER_TYPE: 'other',
  CURR_CODE: 'VND',
  COMMAND: 'pay',
  VERSION: '2.1.0',
  LOCALE: 'vn',
  SUCCESS_CODE: '00',
  FAILED_CODE: '07',
};

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];
export const PREFIX_PAYMENT_CODE = 'HD';
