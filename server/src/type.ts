import { ProductOrderItemModelType } from '@shared/models/product-order-item.model';
import { ReceiverType } from '@shared/models/receiver.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Receiver = ReceiverType;
    type ProductOrderItem = ProductOrderItemModelType;
  }
}

// The file MUST be a module!
export {};
