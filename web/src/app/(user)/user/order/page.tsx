import Orders from '@/app/(user)/user/order/column';
import FilterOrder from '@/app/(user)/user/order/filter';

const OrderHistory = () => {
  return (
    <div className="mx-auto mt-3 w-[70vw]">
      <div className="border-accent rounded-md border-2 p-4">
        <h2 className="text-primary text-3xl">Thông tin đơn hàng</h2>
        <span className="bg-accent mt-2 mb-4 block h-[2px] w-full" />
        <div className="flex w-full flex-col gap-1">
          <div className={'flex w-full items-center gap-3'}>
            <p className={'w-[100px]'}>Lọc theo: </p>
            <FilterOrder />
          </div>
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
