import ListOrderItem from '@/app/order/ListOrderItem';
import OrderInfo from './OrderInfo';
import OrderPayment from './OrderPayment';
import OrderSummary from './OrderSummary';

export default function Order() {
  return (
    <div className="mx-auto max-w-screen-xl py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[1.75fr_1.25fr] gap-10">
        <div>
          <OrderInfo />
          <OrderPayment />
        </div>

        <div className="flex flex-col space-y-6">
          <ListOrderItem />
          <OrderSummary
            subtotal={300000}
            discount={100000}
            total={200000}
            onCheckout={() => console.log('Đặt hàng')}
          />
        </div>
      </div>
    </div>
  );
}
