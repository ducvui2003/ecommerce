import {
  SePaymentTransactionType,
  VnPayPaymentTransactionType,
} from '@shared/models/payment-transaction.model';
import { ProductOrderItemModelType } from '@shared/models/product-order-item.model';
import { ReceiverType } from '@shared/models/receiver.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Receiver = ReceiverType;
    type ProductOrderItem = ProductOrderItemModelType;
    type PaymentTransactionPayload =
      | SePaymentTransactionType
      | VnPayPaymentTransactionType;
  }
}

// The file MUST be a module!
export {};
