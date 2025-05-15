import Link from '@/components/Link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';
import { Role } from '@/types/auth.type';
import { GetUserResType, UserStatus } from '@/types/user.type';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

const userColumns: ColumnDef<GetUserResType>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value: UserStatus = row.getValue('status');

      return <Badge userStatus={value}>{value}</Badge>;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const value: Role = row.getValue('role');

      return <Badge userRole={value}>{value}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');

      return <div className="font-medium">{formatDate(value)}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;
      const router = useRouter();
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
              <Link href={`/admin/user/${id}`} className="flex-1">
                Chỉnh sửa khách hàng
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default userColumns;
