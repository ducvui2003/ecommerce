import { NumberToDecimalSchema } from '@shared/models/base.model';
import { OrderModel } from '@shared/models/order.model';
export class CreateOrderDto {
  userId: number;
  totalAmount: number;
  feeShipping: number;
  receiver: {
    name: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
  orderItem: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}


export const CreateOrderItemBodySchema = OrderModel;