'use client';
import OrderInfo from '@/app/order/OrderInfo';
import OrderPayment from '@/app/order/OrderPayment';
import { Form } from '@/components/ui/form';
import orderService from '@/service/order.service';
import {
  CreateOrderFormSchema,
  CreateOrderFormType,
  CreateOrderReqType,
} from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type OrderFormTypeProps = {
  cartItemIds: string[];
};

const OrderForm = ({ cartItemIds }: OrderFormTypeProps) => {
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
    orderService.createOrder(data).then((response) => {
      const { type, url } = response;
      if (type === 'REDIRECT') {
        window.location.href = url;

        return;
      }
      if (type === 'QR_CODE') {
        return;
      }
    });
  }

  return (
    <Form {...form}>
      <form id="order-form" onSubmit={form.handleSubmit(onSubmit)}>
        <OrderInfo />
        <OrderPayment />
      </form>
    </Form>
  );
};

export default OrderForm;
