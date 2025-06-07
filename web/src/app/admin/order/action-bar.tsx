import ClientIcon from '@/components/ClientIcon';
import DropdownSelect from '@/components/DropdownSelect';
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/date-picker';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { paymentStatus, statusOrder } from '@/constraint/variable';
import { filterFalsy } from '@/lib/utils';
import {
  OrderManagerResType,
  OrderManagerSearchParamsType,
  OrderSearchParamsManagerSchema,
} from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type ActionsBarProps = {
  table: Table<OrderManagerResType>;
  currentValue: OrderManagerSearchParamsType;
  onSearch: (search: OrderManagerSearchParamsType) => void;
};

const ActionBar = ({
  table,
  currentValue: currentSearch,
  onSearch,
}: ActionsBarProps) => {
  const form = useForm<OrderManagerSearchParamsType>({
    resolver: zodResolver(OrderSearchParamsManagerSchema),
    defaultValues: currentSearch ?? {
      dateFrom: undefined,
      dateTo: undefined,
    },
  });

  const { watch } = form;

  const debounceSearch = useDebouncedCallback(
    (search: OrderManagerSearchParamsType) => {
      onSearch(search);
    },
    500,
  );

  useEffect(() => {
    const subscription = watch((value) => {
      const searchParams: OrderManagerSearchParamsType = {
        orderStatus: value.orderStatus?.length
          ? filterFalsy(value.orderStatus)
          : undefined,
        paymentStatus: value.paymentStatus?.length
          ? filterFalsy(value.paymentStatus)
          : undefined,
        id: value.id?.trim() || undefined,
        nameReceiver: value.nameReceiver?.trim() || undefined,
        phoneReceiver: value.phoneReceiver?.trim() || undefined,
        dateFrom: value.dateFrom ? new Date(value.dateFrom) : undefined,
        dateTo: value.dateTo ? new Date(value.dateTo) : undefined,
      };
      debounceSearch(searchParams);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Form {...form}>
      <form className="border-accent flex rounded-md border-2 px-3 py-2">
        <div className="flex items-start gap-2">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="item-centers flex gap-2">
                  <Label>Mã đơn hàng</Label>
                  <FormControl>
                    <Input placeholder="Mã đơn hàng" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <Label>Khách hàng</Label>
              <FormField
                control={form.control}
                name="phoneReceiver"
                render={({ field }) => (
                  <FormItem className="item-centers flex gap-2">
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameReceiver"
                render={({ field }) => (
                  <FormItem className="item-centers flex gap-2">
                    <FormControl>
                      <Input placeholder="Tên khách hàng" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <SelectDate />
            <SelectPaymentStatus />
            <SelectOrderStatus />
          </div>
        </div>
      </form>
      <div className="mt-3 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <ClientIcon icon={'material-symbols:visibility'} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta?.label ?? column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Form>
  );
};

const SelectDate = () => {
  const form = useFormContext<OrderManagerSearchParamsType>();
  return (
    <div className="flex gap-2">
      <FormField
        control={form.control}
        name="dateFrom"
        render={({ field }) => {
          return (
            <FormItem>
              <DatePickerWithPresets
                date={field.value}
                setDate={field.onChange}
              />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="dateTo"
        render={({ field }) => {
          return (
            <FormItem>
              <DatePickerWithPresets
                date={field.value}
                setDate={field.onChange}
              />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

const SelectPaymentStatus = () => {
  const form = useFormContext<OrderManagerSearchParamsType>();
  const { setValue } = form;
  return (
    <FormItem className="flex items-center gap-2">
      <Label className="m-0 h-fit">Trạng thái thanh toán </Label>
      <DropdownSelect<
        string,
        {
          id: string;
          name: string;
        }
      >
        data={Object.entries(paymentStatus).map(([key, value]) => {
          return {
            id: key,
            name: value,
          };
        })}
        submit={(ids) => {
          setValue('paymentStatus', ids);
        }}
      />
    </FormItem>
  );
};

const SelectOrderStatus = () => {
  const form = useFormContext<OrderManagerSearchParamsType>();
  const { setValue } = form;
  return (
    <FormItem className="flex items-center gap-2">
      <Label className="m-0 h-fit">Trạng thái đơn hàng</Label>
      <DropdownSelect<
        string,
        {
          id: string;
          name: string;
        }
      >
        data={Object.entries(statusOrder).map(([key, value]) => {
          return {
            id: key,
            name: value,
          };
        })}
        submit={(ids) => {
          setValue('orderStatus', filterFalsy(ids));
        }}
      />
    </FormItem>
  );
};
export default ActionBar;
