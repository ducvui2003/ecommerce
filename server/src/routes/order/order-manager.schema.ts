import { PaymentProvider } from '@prisma/client';
import {
  OrderStatus,
  OrderStatusType,
  SortBy,
} from '@shared/constants/order.constant';
import {
  PaymentProviderType,
  PaymentStatus,
  PaymentStatusType,
} from '@shared/constants/payment.constant';
import { OrderBy, orderBySchema } from '@shared/constants/search.constant';
import { DecimalToNumberSchema } from '@shared/models/base.model';
import { OrderItemModel } from '@shared/models/order-item.model';
import { OrderModel } from '@shared/models/order.model';
import { PaymentModel } from '@shared/models/payment.model';
import { ProductOrderItemModel } from '@shared/models/product-order-item.model';
import { ReceiverModel } from '@shared/models/receiver.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

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

const SearchOrderManagerReqSchema = PageableSchema.extend({
  id: z.string().optional(),
  nameUser: z.string().optional(),
  nameReceiver: z.string().optional(),
  phoneReceiver: z.string().optional(),
  date: z
    .object({
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
    })
    .optional(),
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

type SearchOrderType = z.infer<typeof SearchOrderManagerReqSchema>;

type OrderRepositoryType = {
  id: number;
  totalAmount: number;
  status: OrderStatusType;
  quantity: number;
  createdAt: Date;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  paymentId: number;
  paymentProvider: PaymentProviderType;
  paymentStatus: PaymentStatusType;
  paymentCreatedAt: Date;
};

const OrderResSchema = z.object({
  id: z.number(),
  totalAmount: DecimalToNumberSchema,
  status: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  receiver: ReceiverModel.pick({
    name: true,
    phone: true,
    email: true,
  }),
  payment: PaymentModel.pick({
    id: true,
    provider: true,
    status: true,
    createdAt: true,
  }),
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
      quantity: true,
    }).merge(ProductOrderItemModel),
  ),
  payment: PaymentModel.pick({
    createdAt: true,
    updatedAt: true,
  }).extend({
    status: z.nativeEnum(PaymentStatus),
    provider: z.nativeEnum(PaymentProvider),
  }),
});

type OrderResType = z.infer<typeof OrderResSchema>;
type OrderDetailResType = z.infer<typeof OrderDetailResSchema>;

export { OrderResSchema, SearchOrderManagerReqSchema, OrderDetailResSchema };
export type {
  OrderRepositoryType,
  OrderResType,
  SearchOrderType,
  OrderDetailResType,
};
