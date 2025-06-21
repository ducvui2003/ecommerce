'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ClientIcon from '@/components/ClientIcon';
import { DashboardResType } from '@/types/dashboard.type';
import { useState } from 'react';
import { statusOrder, StatusOrderType } from '@/constraint/variable';
import { Badge } from '@/components/ui/badge';
type OrderTotalProps = {
  order: DashboardResType['stats']['total']['order'];
};

const OrderTotal = ({ order }: OrderTotalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className="relative flex-1"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <PopoverTrigger asChild>
          <div className="border-accent flex cursor-pointer items-center gap-2 border-2 px-3 py-2 shadow-md">
            <span className="-pb-10 rounded-md border-2 bg-white shadow">
              <ClientIcon icon={'fluent-mdl2:product-variant'} size={50} />
            </span>
            <span>
              {Object.values(order).reduce((acc, curr) => acc + curr, 0)} Đơn
              hàng
            </span>
          </div>
        </PopoverTrigger>

        <PopoverContent className="z-50">
          {Object.entries(order).map(([key, value]) => {
            const keyMap = key as StatusOrderType;
            return (
              <div
                key={key}
                className="flex items-center justify-between gap-2 border-b py-1 last:border-none"
              >
                <Badge className="text-md" orderStatus={keyMap}>
                  {statusOrder[keyMap]}
                </Badge>
                <span className="font-semibold">{value} đơn</span>
              </div>
            );
          })}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default OrderTotal;
