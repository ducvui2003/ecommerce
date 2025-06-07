'use client';

import { flexRender } from '@tanstack/react-table';

import { DataTablePagination } from '@/components/data-table/DataTablePagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUserOrderTable } from '@/hooks/use-user-order-datatable';
import { OrderSearchParamsType } from '@/types/order.type';
import { useState } from 'react';
import ActionBar from '@/app/(user)/user/order/action-bar';

export function DataTable() {
  const [search, setSearch] = useState<OrderSearchParamsType>({});
  const { table, columns } = useUserOrderTable(search);

  return (
    <>
      <div className={'mb-2 flex w-full items-center gap-3'}>
        <p className={'w-[100px]'}>Lọc theo: </p>
        <ActionBar table={table} currentValue={search} onSearch={setSearch} />
      </div>
      <div className="rounded-md border">
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center"
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
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
                    Không có đơn hàng nào phù hợp với bộ lọc hiện tại
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-secondary mt-2 py-2">
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
}
