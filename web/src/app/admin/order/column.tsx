import DialogChangeStatus from '@/app/admin/order/action';
import { Badge } from '@/components/ui/badge';
import {
  PaymentProvider,
  paymentStatus,
  PaymentStatus,
  statusOrder,
  StatusOrderType,
} from '@/constraint/variable';
import { currency, formatDate } from '@/lib/utils';
import { OrderManagerResType } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import sepay from 'public/images/sepay.png';
import vnpay from 'public/images/VNpay.png';

const orderColumns: ColumnDef<OrderManagerResType>[] = [
  {
    accessorKey: 'id',
    header: '#',
    size: 10,
    enableHiding: false,
  },

  {
    accessorKey: 'receiver',
    header: 'Khách hàng',
    size: 100,
    enableHiding: false,
    cell: ({ row }) => {
      const {
        receiver: { name },
      } = row.original;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền',
    size: 20,
    meta: { label: 'Tổng tiền' },

    cell: ({ row }) => {
      const value: number = row.getValue('totalAmount');

      return <div className="font-medium">{currency(value)}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: ({}) => {
      return <div className="text-center">Số lượng</div>;
    },
    meta: { label: 'Số lượng' },
    size: 100,
    cell: ({ row }) => {
      const value: number = row.getValue('quantity');

      return <div className="text-center font-medium">{value.toString()}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian đặt hàng',
    meta: { label: 'Thời gian đặt hàng' },

    size: 100,
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái đơn hàng',
    meta: { label: 'Trạng thái đơn hàng' },

    size: 100,
    cell: ({ row }) => {
      const value: StatusOrderType = row.getValue('status');

      return <Badge orderStatus={value}>{statusOrder[value]}</Badge>;
    },
  },
  {
    accessorKey: 'payment',
    header: 'Trạng thái thanh toán',
    meta: { label: 'Trạng thái thanh toán' },

    size: 100,
    cell: ({ row }) => {
      const {
        status,
      }: {
        status: PaymentStatus;
      } = row.getValue('payment');

      return <Badge paymentStatus={status}>{paymentStatus[status]}</Badge>;
    },
  },
  {
    id: 'payment.method',
    accessorKey: 'payment.method',
    header: 'Phương thức thanh toán',
    size: 100,
    meta: { label: 'Phương thức thanh toán' },

    cell: ({ row }) => {
      const {
        provider,
      }: {
        provider: PaymentProvider;
      } = row.getValue('payment');
      if (provider === 'VNPAY') {
        return <Image src={vnpay} alt="" width={30} height={30} />;
      }
      if (provider === 'SEPAY') {
        return <Image src={sepay} alt="" width={30} height={30} />;
      }
      return <div>null</div>;
    },
  },
  {
    id: 'payment.id',
    accessorKey: 'payment.id',
    header: 'Mã thanh toán',
    meta: { label: 'Mã thanh toán' },

    size: 100,
    cell: ({ row }) => {
      const {
        id,
      }: {
        id: number;
      } = row.getValue('payment');

      return <div>{id}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 20,
    cell: ({ row }) => {
      const { id } = row.original;
      const status = row.getValue('status') as StatusOrderType;
      return <DialogChangeStatus id={id} status={status} />;
    },
  },
];
export default orderColumns;
