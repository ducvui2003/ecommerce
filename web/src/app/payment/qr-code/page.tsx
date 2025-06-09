'use client';
import { socket } from '@/app/payment/qr-code/socket';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { HOME_PAGE } from '@/constraint/variable';
import { useAppSelector } from '@/hooks/use-store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PaymentQrCode = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState('N/A');
  const [success, setSuccess] = useState(false);
  const qrCode = useAppSelector((state) => state.orderSlice.qrCode);

  if (!qrCode) {
    return <div className="text-center">No QR code available</div>;
  }
  function onConnect() {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);

    socket.io.engine.on('upgrade', (transport) => {
      setTransport(transport.name);
    });
  }

  function onDisconnect() {
    setIsConnected(false);
    setTransport('N/A');
  }

  function onPaymentEvent(value: { message: string; status: string }) {
    console.log('Payment event received:', value);
    if (value.status === 'success') {
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('paymentEvent', onPaymentEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <div className="bg-primary flex h-screen flex-col items-center justify-center">
      {success ? (
        <div className="rounded-md border-2 shadow-md">
          <p className="mb-4 text-lg">
            Vui lòng chuyển khoản theo cú pháp đã quy định{' '}
          </p>
          <Image
            src={qrCode}
            alt="Image"
            className="rounded-md object-cover"
            width={400}
            height={400}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-4xl">Thanh toán thành công</h3>
          <Button>
            <Link href={HOME_PAGE}>Trang chủ</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentQrCode;
