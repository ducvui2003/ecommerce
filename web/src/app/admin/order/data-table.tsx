'use client';

import { DataTablePagination } from '@/components/data-table/DataTablePagination';
import { flexRender } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useState } from 'react';
import { useOrderTable } from '@/hooks/use-manager-order-datatable';
import { OrderManagerSearchParamsType } from '@/types/order.type';
import ActionBar from '@/app/admin/order/action-bar';
import DialogOrderStatus from '@/components/DialogOrderStatus';

export function DataTable() {
  const [search, setSearch] = useState<OrderManagerSearchParamsType>({});
  const { table, columns } = useOrderTable(search);

  return (
    <div>
      <ActionBar table={table} currentValue={search} onSearch={setSearch} />

      <div className="relative mt-4 h-[67vh] overflow-y-auto rounded-md border">
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
                  Không có đơn hàng nào phù hợp với bộ lọc hiện tại
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="bg-secondary sticky bottom-0 mt-2 py-2">
          <DataTablePagination table={table} />
        </div>
      </div>
      <DialogOrderStatus />
    </div>
  );
}
