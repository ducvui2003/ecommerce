import OrderDetailManager from '@/app/admin/order/[id]/order-detail';
import { notFound } from 'next/navigation';

type OrderManagerDetailProps = {
  params: Promise<{ id: string }>;
};

const OrderManagerDetail = async ({ params }: OrderManagerDetailProps) => {
  const { id } = await params;

  if (!id) {
    return notFound();
  }
  return <OrderDetailManager id={parseInt(id)} />;
};

export default OrderManagerDetail;
