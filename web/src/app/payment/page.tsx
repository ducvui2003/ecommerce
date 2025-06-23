import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';

const PaymentPage = async () => {
  return (
    <div className="bg-primary grid h-screen place-items-center">
      <div className="flex flex-col items-center">
        <ClientIcon
          icon={'ix:success-filled'}
          size={100}
          className="text-green-500"
        />
        <div className="mt-10 text-3xl font-bold">Thanh toán thành công</div>
        <p className="pt-4 text-xl">Đơn hàng đã được thanh toán thành công</p>
        <div className="flex flex-col items-center gap-4">
          <Button>
            <Link href={'/user/order'}>Kiểm tra đơn hàng</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
