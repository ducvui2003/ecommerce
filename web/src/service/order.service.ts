import envConfig from '@/config/env.config';
import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { CreateOrderReqType, CreateOrderResType } from '@/types/order.type';

const orderService = {
  createOrder: async (req: CreateOrderReqType) => {
    const response = await http.post<ResponseApi<CreateOrderResType>>(
      '/api/v1/orders',
      req,
    );
    return response.payload.data;
  },

  setReqCreateOrder: async (req: CreateOrderReqType) => {
    await fetch(`${envConfig.NEXT_PUBLIC_SERVER_INTERNAL}/api/payment`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  setResCreateOrder: async (req: CreateOrderResType) => {
    await fetch(`${envConfig.NEXT_PUBLIC_SERVER_INTERNAL}/api/payment`, {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default orderService;
