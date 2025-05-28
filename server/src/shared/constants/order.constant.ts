export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  DELIVERING: 'DELIVERING',
  CANCELED: 'CANCELED',
  COMPLETE: 'COMPLETE',
} as const;
export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
