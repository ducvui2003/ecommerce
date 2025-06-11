const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  DELIVERING: 'DELIVERING',
  CANCELED: 'CANCELED',
  COMPLETE: 'COMPLETE',
} as const;

const SortBy = {
  Price: 'price',
  CreatedAt: 'createdAt',
} as const;

type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
export { SortBy, OrderStatus };
export type { OrderStatusType };
