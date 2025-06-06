import {
  PaymentProvider,
  PaymentStatus,
  StatusOrderType,
} from '@/constraint/variable';
import { PageReq } from '@/types/api.type';
import { z } from 'zod';

const string = z.string().trim().min(1, 'Không được để trống trường này');

const CreateOrderFormSchema = z.object({
  name: string,
  email: string,
  phone: string,
  detail: string,
  ward: string,
  district: string,
  province: string,
  note: z.string().optional(),
  method: z.enum(['VNPAY', 'SEPAY']),
  cartItemIds: z.array(z.string()),
  feeShipping: z.number().optional(),
});

type ReceiverOrderType = {
  name: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
};

type CreateOrderReqType = {
  feeShipping: number;
  receiver: ReceiverOrderType;
  cartItemIds: string[];
  method: string;
};

type CreateOrderResType = {
  orderId: number;
  paymentId: number;
  totalAmount: number;
  url: string;
  type: 'QR_CODE' | 'REDIRECT';
};

type CreateOrderCookie = {
  req: CreateOrderReqType;
  res?: CreateOrderResType;
};

type OrderResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  quantity: number;
  createdAt: Date;
};

type OrderDetailResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  items: OrderDetailItemType[];
  receiver: {
    name: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
  createdAt: Date;
  payment: {
    provider: string;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
  };
};

type OrderDetailItemType = {
  id: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  media: string;
  options?: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
};

type OrderSearchParamsType = {
  status?: StatusOrderType;
};

type CreateOrderFormType = z.infer<typeof CreateOrderFormSchema>;

type OrderManagerSearchParamsType = {};

type OrderManagerResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  quantity: number;
  createdAt: Date;
  receiver: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  payment: {
    id: string;
    provider: PaymentProvider;
    status: PaymentStatus;
  };
};

export { CreateOrderFormSchema };
export type {
  CreateOrderFormType,
  CreateOrderReqType,
  CreateOrderResType,
  CreateOrderCookie,
  OrderResType,
  OrderDetailResType,
  OrderSearchParamsType,
  OrderDetailItemType,
  OrderManagerResType,
  OrderManagerSearchParamsType,
};
