'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/app/(user)/user/order/table';
import { Button } from '@/components/ui/button';

type OrderStatus = 'Chờ xử lý' | 'Đang vận chuyển' | 'Hoàn thành';

interface Order {
  id: number; // order number, e.g. 1111
  orderDate: string; // ISO date or localized string, e.g. '13/4/2024'
  totalAmount: number; // total amount in VND
  productCount: number; // number of products
  status: OrderStatus; // one of three statuses
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'orderDate',
    header: 'Ngày đặt hàng',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền (VND)',
  },
  {
    accessorKey: 'productCount',
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
        className="text-sm px-3 py-1 hover:bg-primary hover:text-white transition"
        onClick={() => console.log('View order', row.original.id)}
      >
        Xem chi tiết
      </Button>
    ),
  }
];

interface Order {
  id: number;
  orderDate: string; // 'YYYY-MM-DD'
  totalAmount: number; // in VND
  productCount: number;
  status: OrderStatus;
}

const data: Order[] = [
  {
    id: 1111,
    orderDate: '2024-04-13',
    totalAmount: 2350000,
    productCount: 1,
    status: 'Hoàn thành',
  },
  {
    id: 2222,
    orderDate: '2024-04-14',
    totalAmount: 1850000,
    productCount: 2,
    status: 'Đang vận chuyển',
  },
  {
    id: 3333,
    orderDate: '2024-04-15',
    totalAmount: 3200000,
    productCount: 3,
    status: 'Chờ xử lý',
  },
  {
    id: 4444,
    orderDate: '2024-04-16',
    totalAmount: 4100000,
    productCount: 4,
    status: 'Hoàn thành',
  },
  {
    id: 5555,
    orderDate: '2024-04-17',
    totalAmount: 1250000,
    productCount: 1,
    status: 'Đang vận chuyển',
  },
  {
    id: 6666,
    orderDate: '2024-04-18',
    totalAmount: 1990000,
    productCount: 2,
    status: 'Chờ xử lý',
  },
  {
    id: 7777,
    orderDate: '2024-04-19',
    totalAmount: 4800000,
    productCount: 5,
    status: 'Hoàn thành',
  },
  {
    id: 8888,
    orderDate: '2024-04-20',
    totalAmount: 1500000,
    productCount: 1,
    status: 'Đang vận chuyển',
  },
  {
    id: 9999,
    orderDate: '2024-04-21',
    totalAmount: 2700000,
    productCount: 3,
    status: 'Chờ xử lý',
  },
  {
    id: 1010,
    orderDate: '2024-04-22',
    totalAmount: 3650000,
    productCount: 4,
    status: 'Hoàn thành',
  },  {
    id: 1011,
    orderDate: '2024-04-22',
    totalAmount: 3650000,
    productCount: 4,
    status: 'Hoàn thành',
  },  {
    id: 1012,
    orderDate: '2024-04-22',
    totalAmount: 3650000,
    productCount: 4,
    status: 'Hoàn thành',
  },
];

const Orders = () => {
  return (
    <>
      <span className="bg-accent mt-2 mb-2 block h-[2px] w-full" />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Orders;
