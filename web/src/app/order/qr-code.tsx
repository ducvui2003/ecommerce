'use client';
import { useSocket } from '@/app/order/socket';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/use-store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type PaymentQrCodeProps = {
  url: string;
  paymentId: number;
  orderId: number;
};

const PaymentQrCode = ({ url, orderId, paymentId }: PaymentQrCodeProps) => {
  const socket = useSocket();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!socket) return;

    function onPaymentEvent(value: { message: string; status: string }) {
      console.log('Payment event received:', value);
      if (value.status === 'success') {
        setSuccess(true);
      }
    }

    socket.on('paymentEvent', onPaymentEvent);

    return () => {
      socket.off('paymentEvent', onPaymentEvent);
    };
  }, [socket]);
  return (
    <Dialog open={true}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            Thanh toán cho đơn hàng <b> # {orderId}</b>
          </DialogTitle>
          <DialogDescription>
            <p>
              Chuyển khoản với cú pháp <b>HD {paymentId}</b>
            </p>
            <p>Vui lòng chuyển khoản theo cú pháp đã quy định</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          {!success ? (
            <div className="rounded-md border-2 shadow-md">
              <Image
                src={url}
                alt="Image"
                className="rounded-md object-cover"
                width={400}
                height={400}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-4xl">Thanh toán thành công</h3>
              <ClientIcon
                icon={'clarity:success-standard-solid'}
                className="animate-shake text-green-500"
                size={100}
              />
              <Button>
                <Link href={'/user/order'}>Kiểm tra đơn hàng</Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentQrCode;
