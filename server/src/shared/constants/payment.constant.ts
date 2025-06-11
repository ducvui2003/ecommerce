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

export const PaymentProvider = {
  SEPAY: 'SEPAY',
  VNPAY: 'VNPAY',
} as const;

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type PaymentProviderType =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];
export const PREFIX_PAYMENT_CODE = 'HD';
