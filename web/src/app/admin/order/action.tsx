'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusOrderType } from '@/constraint/variable';
import { openDialogUpdate } from '@/features/manager/order/order.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

type DialogChangeStatusProps = {
  id: number;
  status: StatusOrderType;
};

const DialogChangeStatus = ({ id, status }: DialogChangeStatusProps) => {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
        <DropdownMenuItem
          onClick={() => {
            dispatch(
              openDialogUpdate({
                orderId: id,
                currentStatus: status,
              }),
            );
          }}
        >
          Cập nhập trạng thái đơn hàng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DialogChangeStatus;
