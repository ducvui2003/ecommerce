import ClientIcon from '@/components/ClientIcon';
import DropdownSelect from '@/components/DropdownSelect';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  useGetAllCategoryQuery,
  useGetAllSupplierQuery,
} from '@/features/manager/product/product.api';
import { currency } from '@/lib/utils';
import { CategoryType } from '@/types/category.type';
import { ProductManagerResType, SearchParams } from '@/types/product.type';
import { SupplierType } from '@/types/supplier.type';
import { Table } from '@tanstack/react-table';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type ActionsBarProps = {
  table: Table<ProductManagerResType>;
  currentValue: SearchParams;
  onSearch: (search: SearchParams) => void;
};

const ActionBar = ({
  table,
  currentValue: currentSearch,
  onSearch,
}: ActionsBarProps) => {
  const { data: dataCategory } = useGetAllCategoryQuery();
  const { data: dateSupplier } = useGetAllSupplierQuery();
  const [price, setPrice] = useState<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);

  useEffect(() => {
    console.log(price);
  }, [price]);

  const debounceInputChange = useDebouncedCallback((val: string) => {
    onSearch({
      ...currentSearch,
      name: val,
    });
  }, 500);

  const debouncePriceChange = useDebouncedCallback(
    (minPrice?: number, maxPrice?: number) => {
      onSearch({
        ...currentSearch,
        minPrice,
        maxPrice,
      });
    },
    500,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    debounceInputChange(keyword);
  };

  const handlePriceChange = () => {
    debouncePriceChange(price?.[0], price?.[1]);
  };

  useEffect(() => {
    return () => debounceInputChange.cancel();
  }, [debounceInputChange]);

  useEffect(() => {
    return () => debouncePriceChange.cancel();
  }, [debouncePriceChange]);

  const handleSelectCategory = (checkedCategory: number[]) => {
    onSearch({
      ...currentSearch,
      categoryId: checkedCategory,
    });
  };

  const handleSelectSupplier = (checkedSupplier: number[]) => {
    onSearch({
      ...currentSearch,
      supplierId: checkedSupplier,
    });
  };

  return (
    <div className="">
      <div className="border-accent flex rounded-md border-2 px-3 py-2">
        <div className="flex items-start gap-2">
          <div>
            <span>Tên sản phẩm</span>
            <input
              onChange={handleInputChange}
              className="w-full rounded-md border-2 border-gray-100 px-2 py-2 shadow-md outline-none"
              placeholder="Tên sản phẩm"
            />
          </div>
          <div>
            <span className="">Thể loại</span>
            {dataCategory && (
              <DropdownSelect<number, CategoryType>
                data={dataCategory.map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                  };
                })}
                submit={(ids) => {
                  handleSelectCategory(ids);
                }}
              />
            )}
          </div>
          <div>
            <span>Nhà cung cấp</span>
            {dateSupplier && (
              <DropdownSelect<number, SupplierType>
                data={dateSupplier.map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                  };
                })}
                submit={(ids) => {
                  handleSelectSupplier(ids);
                }}
              />
            )}
          </div>

          <div>
            <span className="inline-flex items-center gap-3">
              <span>Giá cả:</span>
              {price?.[0] && (
                <span className="text-md">{currency(price[0])}</span>
              )}
              <ClientIcon icon={'formkit:arrowright'} />
              {price?.[1] ? (
                <span className="text-md">{currency(price[1])}</span>
              ) : (
                <ClientIcon icon={'mdi:infinity'} />
              )}
            </span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="20.000"
                defaultValue={0}
                onChange={(e) => {
                  let value: number | undefined = e.currentTarget.valueAsNumber;
                  if (isNaN(value)) value = undefined;
                  setPrice((prev) => [value, prev?.[1]]);
                  handlePriceChange();
                }}
              />
              <ClientIcon icon={'formkit:arrowright'} />
              <Input
                type="number"
                placeholder="200.000"
                onChange={(e) => {
                  let value: number | undefined = e.currentTarget.valueAsNumber;
                  if (isNaN(value)) value = undefined;
                  setPrice((prev) => [prev?.[0], value]);
                  handlePriceChange();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <Button>
          <Link href={'/admin/product/create'}>Tạo sản phẩm</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4">
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default ActionBar;
