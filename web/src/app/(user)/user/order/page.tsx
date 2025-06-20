'use client';

import { DataTable } from '@/app/(user)/user/order/data-table';
import OrderDetailSheet from '@/components/OrderDetailSheet';

const OrderHistory = () => {
  return (
    <div className="mx-auto mt-3 w-[70vw]">
      <div className="border-accent rounded-md border-2 p-4">
        <h2 className="text-primary text-3xl">Thông tin đơn hàng</h2>
        <span className="bg-accent mt-2 mb-4 block h-[2px] w-full" />
        <div className="flex w-full flex-col gap-1">
          <DataTable />
        </div>
      </div>
      <OrderDetailSheet />
    </div>
  );
};

export default OrderHistory;
