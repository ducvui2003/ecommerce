'use client';

import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/hooks/use-store';

const PaymentPage = () => {
  const { req, res } = useAppSelector((state) => state.orderSlice);
  if (!req || !res) return null;
  return (
    <div className="bg-primary grid h-screen place-items-center">
      <div className="flex flex-col items-center">
        <ClientIcon
          icon={'ix:success-filled'}
          size={100}
          className="text-green-500"
        />
        <div className="mt-10 text-3xl font-bold">Thanh toán thành công</div>
        <p className="pt-4 text-xl">
          Đơn hàng {res.orderId} đã được thanh toán thành công
        </p>
        <Card className="mt-4 w-[500px]">
          <CardHeader className="text-center">
            <CardTitle>Thông tin đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md grid gap-1 [&>div>span:first-child]:inline-block [&>div>span:first-child]:pr-2 [&>div>span:first-child]:font-semibold">
              <div>
                <span>Mã đơn hàng</span>
                <span>{res.orderId}</span>
              </div>
              <div>
                <span>Mã giao dịch</span>
                <span>{res.paymentId}</span>
              </div>
              <div>
                <span>Phương pháp thanh toán</span>
                <span>{req.method}</span>
              </div>
              <Separator />
              <div>
                <span>Họ tên người nhận: </span>
                <span>{req.receiver.name}</span>
              </div>
              <div>
                <span>Email: </span>
                <span>{req.receiver.email}</span>
              </div>
              <div>
                <span>Số điện thoại: </span>
                <span>{req.receiver.phone}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="ml-auto" href={'/user/order'}>
              <Button>Xem chi tiết</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
