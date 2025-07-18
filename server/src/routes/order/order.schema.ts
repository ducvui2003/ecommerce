import { OrderStatus, SortBy } from '@shared/constants/order.constant';
import { PaymentProvider } from '@shared/constants/payment.constant';
import { OrderBy, orderBySchema } from '@shared/constants/search.constant';
import { DecimalToNumberSchema } from '@shared/models/base.model';
import { CartItemModel } from '@shared/models/cart-item.model';
import { OrderItemModel } from '@shared/models/order-item.model';
import { OrderModel } from '@shared/models/order.model';
import { PaymentModel } from '@shared/models/payment.model';
import { ProductOrderItemModel } from '@shared/models/product-order-item.model';
import { ProductModel } from '@shared/models/product.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const ReceiverSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  detail: z.string().min(1),
});

const sortBySchema = z.enum([SortBy.CreatedAt, SortBy.Price]);

const sortSchema = z
  .string()
  .refine((val) => val.includes('_'), {
    message: 'Sort format must be like "price_asc"',
  })
  .transform((val) => {
    const [sortBy, orderBy] = val.split('_');
    return { sortBy, orderBy };
  })
  .pipe(
    z.object({
      sortBy: sortBySchema,
      orderBy: orderBySchema,
    }),
  );

const SearchOrderReqSchema = PageableSchema.extend({
  status: z.nativeEnum(OrderStatus).optional(),
  sorts: z
    .preprocess((val) => {
      // normalize to array
      if (typeof val === 'string') return [val];
      if (Array.isArray(val)) return val;
      return []; // fallback
    }, z.array(sortSchema))
    .default([`${SortBy.CreatedAt}_${OrderBy.Asc}`]),
});

const CreateOrderSchema = z.object({
  feeShipping: z.coerce.number().nonnegative(),
  receiver: ReceiverSchema,
  cartItemIds: z.array(z.string()).min(1),
  method: z.enum([PaymentProvider.SEPAY, PaymentProvider.VNPAY]),
});

type CreateOrderResType = {
  orderId: number;
  paymentId: number;
  totalAmount: number;
  url: string;
  type: 'QR_CODE' | 'REDIRECT';
};

const OrderResSchema = z.object({
  id: z.number(),
  totalAmount: DecimalToNumberSchema,
  status: z.string(),
  thumbnail: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
});

const OrderDetailResSchema = OrderModel.pick({
  id: true,
  status: true,
  receiver: true,
  createdAt: true,
}).extend({
  totalAmount: DecimalToNumberSchema,
  feeShipping: DecimalToNumberSchema,
  items: z.array(
    OrderItemModel.pick({
      id: true,
      quantity: true,
    })
      .merge(ProductOrderItemModel.omit({ id: true }))
      .extend({
        productId: ProductOrderItemModel.shape.id,
      }),
  ),
  payment: PaymentModel.pick({
    provider: true,
    createdAt: true,
    updatedAt: true,
    status: true,
  }),
});

const CartItemSchema = CartItemModel.pick({
  id: true,
  cartId: true,
  option: true,
  optionId: true,
  quantity: true,
  productId: true,
}).extend({
  product: ProductModel.pick({
    id: true,
    name: true,
    basePrice: true,
    salePrice: true,
  }),
});

type CartItemType = z.infer<typeof CartItemSchema>;

type CreateOrderType = z.infer<typeof CreateOrderSchema>;
type OrderResType = z.infer<typeof OrderResSchema>;
type SearchOrderType = z.infer<typeof SearchOrderReqSchema>;
type OrderDetailResType = z.infer<typeof OrderDetailResSchema>;
export {
  CreateOrderSchema,
  OrderResSchema,
  ReceiverSchema,
  SearchOrderReqSchema,
  OrderDetailResSchema,
};
export type {
  CreateOrderResType,
  CreateOrderType,
  OrderResType,
  OrderDetailResType,
  SearchOrderType,
  CartItemType,
};
