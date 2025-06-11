'use client';

import { DataTablePagination } from '@/components/data-table/DataTablePagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { flexRender } from '@tanstack/react-table';
import { useDebouncedCallback } from 'use-debounce';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUserTable } from '@/hooks/use-manager-user-datatable';
import { setKey } from '@/lib/utils';
import { SearchQueyReqType, UserStatus } from '@/types/user.type';
import { ChangeEvent, useEffect, useState } from 'react';

export function DataTable() {
  const [search, setSearch] = useState<SearchQueyReqType>({});
  const { table, columns } = useUserTable(search);

  return (
    <div>
      <SearchBarDataTable currentSearch={search} onSearch={setSearch} />
      <div className="mt-4 overflow-hidden rounded-md border">
        <ScrollArea className="relative h-[70vh]">
          <Table className="mr-2">
            <TableHeader className="bg-secondary sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="h-[50px]">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ height: '50px' }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có khách hàng nào phù hợp với bộ lọc hiện tại
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="bg-secondary mt-2 py-2">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}

type SelectType = keyof Omit<SearchQueyReqType, 'status'>;

type SelectStatusType = UserStatus | 'ALL';

type SearchBarDataTableProps = {
  currentSearch: SearchQueyReqType;
  onSearch: (search: SearchQueyReqType) => void;
};

const SearchBarDataTable = ({
  currentSearch,
  onSearch,
}: SearchBarDataTableProps) => {
  const [select, setSelect] = useState<SelectType>('id');

  const debounceInputChange = useDebouncedCallback((val: string) => {
    onSearch({
      ...currentSearch,
      [select]: val,
    });
  }, 500);

  useEffect(() => {
    return () => debounceInputChange.cancel();
  }, [debounceInputChange]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    debounceInputChange(keyword);
  };

  const handleSelect = (value: string) => {
    const newSelect = value as SelectType;
    setSelect(newSelect);
    let updated = { ...currentSearch };
    const keyword = updated[select];
    delete updated[select];

    if (newSelect) {
      updated = setKey(
        { ...updated, status: updated.status },
        newSelect,
        keyword,
      );
    }

    onSearch(updated);
  };

  const handleSelectStatus = (value: string) => {
    const status = value as SelectStatusType;
    onSearch({
      ...currentSearch,
      status: status === 'ALL' ? undefined : status,
    });
  };

  return (
    <div className="flex">
      <div className="border-accent inline-flex rounded-md border-2 px-3 py-2">
        <input
          onChange={handleInputChange}
          className="mr-5 border-none outline-none"
          placeholder="Tìm kiếm"
        />
        <Select defaultValue={select} onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tìm kiếm theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked value="id">
              Mã khách hàng
            </SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="name">Họ và tên</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border-accent ml-auto inline-flex rounded-md border-2 px-3 py-2">
        <Select defaultValue={'ALL'} onValueChange={handleSelectStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả</SelectItem>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            <SelectItem value="BLOCKED">BLOCKED</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
