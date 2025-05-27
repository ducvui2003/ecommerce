import OrderForm from '@/app/order/form';
import ListOrderItem from '@/app/order/ListOrderItem';
import OrderSummary from '@/app/order/OrderSummary';
import cartService from '@/service/cart.server.service';

export default async function Order() {
  const response = await cartService.getCartSelected();
  const cartItemIds = response.cartItems.map((item) => item.id);
  const subTotal = response.cartItems.reduce((accumulator, currentValue) => {
    const price =
      (Number(currentValue.product.basePrice) +
        Number(currentValue.option?.price ?? 0)) *
      currentValue.quantity;
    return accumulator + price;
  }, 0);
  return (
    <div className="mx-auto max-w-screen-xl py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[1.75fr_1.25fr] gap-10">
        <OrderForm cartItemIds={cartItemIds} />
        <div className="flex flex-col space-y-6">
          <ListOrderItem data={response} />
          <OrderSummary subtotal={subTotal} discount={0} total={subTotal} />
        </div>
      </div>
    </div>
  );
}
