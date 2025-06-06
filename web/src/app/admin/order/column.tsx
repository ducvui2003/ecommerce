import Link from '@/components/Link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import sepay from 'public/images/sepay.png';
import vnpay from 'public/images/VNpay.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PaymentProvider,
  PaymentStatus,
  StatusOrderType,
} from '@/constraint/variable';
import { currency, formatDate } from '@/lib/utils';
import { OrderManagerResType } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

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
    header: 'Giá',
    size: 20,
    cell: ({ row }) => {
      const value: number = row.getValue('totalAmount');

      return <div className="font-medium">{currency(value)}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    size: 100,
    cell: ({ row }) => {
      const value: number = row.getValue('quantity');

      return <div className="font-medium">{value.toString()}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian',
    size: 100,
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái đơn hàng',
    size: 100,
    cell: ({ row }) => {
      const value: StatusOrderType = row.getValue('status');

      return <Badge orderStatus={value}>{value}</Badge>;
    },
  },
  {
    accessorKey: 'payment',
    header: 'Trạng thái thanh toán',
    size: 100,
    cell: ({ row }) => {
      const {
        status,
      }: {
        status: PaymentStatus;
      } = row.getValue('payment');

      return <Badge paymentStatus={status}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'payment.method',
    header: 'Phương thức thanh toán',
    size: 100,
    cell: ({ row }) => {
      const {
        method,
      }: {
        method: PaymentProvider;
      } = row.getValue('payment');
      if (method === 'VNPAY') {
        return <Image src={vnpay} alt="" width={30} height={30} />;
      }
      if (method === 'SEPAY') {
        return <Image src={sepay} alt="" width={30} height={30} />;
      }
      return <div>null</div>;
    },
  },
  {
    accessorKey: 'payment.id',
    header: 'Mã thanh toán',
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(id.toString())}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/order/${id}`} className="flex-1">
                Xem chi tiết đơn hàng
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default orderColumns;
