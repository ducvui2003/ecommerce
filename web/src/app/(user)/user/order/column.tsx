'use client';
import ClientIcon from '@/components/ClientIcon';
import { Button } from '@/components/ui/button';
import { setIsDetailSheet, setOrderId } from '@/features/order/order.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { formatDate } from '@/lib/utils';
import { OrderResType } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

type OrderStatus = 'Chờ xử lý' | 'Đang vận chuyển' | 'Hoàn thành';

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
    cell: ({ row, column }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền (VND)',
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng sản phẩm',
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as OrderStatus;
      let colorClass = '';

      switch (status) {
        case 'Hoàn thành':
          colorClass = 'bg-green-100 text-green-800';
          break;
        case 'Đang vận chuyển':
          colorClass = 'bg-yellow-100 text-yellow-800';
          break;
        case 'Chờ xử lý':
          colorClass = 'bg-red-100 text-red-800';
          break;
      }

      return (
        <span className={`rounded px-2 py-1 text-sm font-medium ${colorClass}`}>
          {status}
        </span>
      );
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
