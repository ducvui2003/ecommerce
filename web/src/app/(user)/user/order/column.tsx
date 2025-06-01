'use client';
import { DataTable } from '@/app/(user)/user/order/data-table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { OrderResType } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';

type OrderStatus = 'Chờ xử lý' | 'Đang vận chuyển' | 'Hoàn thành';

export const userOrderColumns: ColumnDef<OrderResType>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày đặt hàng',
    cell: ({ row }) => {
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
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-primary px-3 py-1 text-sm transition hover:text-white"
        onClick={() => console.log('View order', row.original.id)}
      >
        Xem chi tiết
      </Button>
    ),
  },
];

const Orders = () => {
  return (
    <>
      <span className="bg-accent mt-2 mb-2 block h-[2px] w-full" />
      <DataTable />
    </>
  );
};

export default Orders;
