import { ConflictException, NotFoundException } from '@nestjs/common';
import { OrderStatusType } from '@shared/constants/order.constant';

export const OrderNotFound = new NotFoundException();
export const OrderChangeNotAllow = (orderAllowed?: OrderStatusType[]) => {
  if (!orderAllowed || orderAllowed.length === 0) {
    return new ConflictException('Order status change is not allowed');
  }
  return new ConflictException(
    `Order status can only be changed to: ${orderAllowed.join(', ')}`,
  );
};
