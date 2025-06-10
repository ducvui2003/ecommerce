'use client';
import ClientIcon from '@/components/ClientIcon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  paymentStatus,
  statusOrder,
  StatusOrderType,
} from '@/constraint/variable';
import { setIsDetailSheet, setOrderId } from '@/features/order/order.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { currency, formatDate } from '@/lib/utils';
import { OrderResType } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';

export const userOrderColumns: ColumnDef<OrderResType>[] = [
  {
    accessorKey: 'id',
    header: '#',
    size: 50,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false

      return (
        <div className="w-ful relative">
          <span> Ngày đặt hàng</span>
          <ClientIcon
            icon={isSorted === 'asc' ? 'iconoir:sort-up' : 'iconoir:sort-down'}
            className="absolute top-1/2 right-0 -translate-y-1/2 hover:cursor-pointer hover:opacity-50"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền (VND)',
    cell: ({ row }) => {
      const value = row.getValue('totalAmount') as number;
      return <span>{currency(value)}</span>;
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng sản phẩm',
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const value = row.getValue('status') as StatusOrderType;

      return <Badge orderStatus={value}>{statusOrder[value]}</Badge>;
    },
  },
  {
    accessorKey: 'details',
    header: 'Chi tiết',
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      return (
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary px-3 py-1 text-sm transition hover:text-white"
          onClick={() => {
            dispatch(setOrderId(row.original.id));
            dispatch(setIsDetailSheet(true));
          }}
        >
          Xem chi tiết
        </Button>
      );
    },
  },
];
