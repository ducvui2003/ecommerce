import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { currency, formatDate } from '@/lib/utils';
import { ProductManagerResType } from '@/types/product.type';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

const productColumns: ColumnDef<ProductManagerResType>[] = [
  {
    accessorKey: 'id',
    header: '#',
    size: 10,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: 'Tên sản phẩm',
    size: 200,
    enableHiding: false,
    cell: ({ row }) => {
      const { resource: media, name } = row.original;
      return (
        <div className="flex gap-2">
          <img src={media} alt="" className="size-[50px] basis-[50px]" />
          <p className="text-md flex-1 text-wrap">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Thể loại',
  },
  {
    accessorKey: 'basePrice',
    header: 'Giá',
    cell: ({ row }) => {
      const value: number = row.getValue('basePrice');

      return <div className="font-medium">{currency(value)}</div>;
    },
  },
  {
    accessorKey: 'salePrice',
    header: 'Giá giảm',
    cell: ({ row }) => {
      const value: number = row.getValue('salePrice');

      return <div className="font-medium">{currency(value)}</div>;
    },
  },
  {
    accessorKey: 'supplier',
    header: 'Nhà cung cấp',
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 100,
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
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
              <Link href={`/admin/product/${id}`} className="flex-1">
                Chỉnh sửa sản phẩm
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default productColumns;
