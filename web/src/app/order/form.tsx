'use client';
import OrderInfo from '@/app/order/OrderInfo';
import OrderPayment from '@/app/order/OrderPayment';

import { Form } from '@/components/ui/form';
import { setQrCode } from '@/features/order/order.slice';
import { useAppDispatch } from '@/hooks/use-store';
import orderService from '@/service/order.service';
import {
  CreateOrderFormSchema,
  CreateOrderFormType,
  CreateOrderReqType,
} from '@/types/order.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import PaymentQrCode from '@/app/order/qr-code';
import { useState } from 'react';

type OrderFormTypeProps = {
  cartItemIds: string[];
};

const OrderForm = ({ cartItemIds }: OrderFormTypeProps) => {
  const [paymentData, setPaymentData] = useState<{
    url: string;
    paymentId: number;
    orderId: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const form = useForm<CreateOrderFormType>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      detail: '',
      feeShipping: 0,
      province: '',
      district: '',
      ward: '',
      note: '',
      cartItemIds: cartItemIds,
    },
  });

  function onSubmit(values: CreateOrderFormType) {
    const data: CreateOrderReqType = {
      feeShipping: 0,
      method: values.method,
      cartItemIds: values.cartItemIds,
      receiver: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        province: values.province,
        district: values.district,
        ward: values.ward,
        detail: values.detail,
      },
    };
    console.log(data);
    // orderService.createOrder(data).then((response) => {
    //   const { type, url, orderId, paymentId } = response;
    //   if (type === 'REDIRECT') {
    //     window.location.href = url;
    //     return;
    //   }
    //   if (type === 'QR_CODE') {
    //     setPaymentData({ url, paymentId, orderId });
    //   }
    // });
  }

  return (
    <>
      <Form {...form}>
        <form id="order-form" onSubmit={form.handleSubmit(onSubmit)}>
          <OrderInfo />
          <OrderPayment />
        </form>
      </Form>
      {paymentData && <PaymentQrCode {...paymentData} />}
    </>
  );
};

export default OrderForm;
