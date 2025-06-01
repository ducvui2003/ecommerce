'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { statusOrder, StatusOrderType } from '@/constraint/variable';
import { OrderResType, OrderSearchParamsType } from '@/types/order.type';
import { Table } from '@tanstack/react-table';

type ActionsBarProps = {
  table: Table<OrderResType>;
  currentValue: OrderSearchParamsType;
  onSearch: (search: OrderSearchParamsType) => void;
};

const ActionBar = ({ currentValue, onSearch, table }: ActionsBarProps) => {
  const handleSelectStatus = (value: string) => {
    onSearch({
      ...currentValue,
      status: value === 'undefined' ? undefined : (value as StatusOrderType),
    });
  };

  return (
    <>
      <div className={'flex w-full justify-between gap-2'}>
        <Select defaultValue={'undefined'} onValueChange={handleSelectStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái đơn hàng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'undefined'} key={6}>
              Tất cả
            </SelectItem>
            {Object.entries(statusOrder).map(([key, value], index) => {
              return (
                <SelectItem key={index} value={key}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ActionBar;
