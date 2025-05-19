'use client';

import { DataTablePagination } from '@/components/data-table/DataTablePagination';
import { flexRender, Table as TableType } from '@tanstack/react-table';

import ClientIcon from '@/components/ClientIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProductTable } from '@/hooks/use-product-datatable';
import { ProductManagerResType } from '@/types/product.type';
import Link from 'next/link';

export function DataTable() {
  const { table, columns } = useProductTable();

  return (
    <div>
      <ActionsBarDataTable table={table} />

      <div className="relative mt-4 h-[80vh] overflow-y-auto rounded-md border">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="bg-secondary sticky bottom-0 mt-2 py-2">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}

type ActionsBarDataTableProps = {
  table: TableType<ProductManagerResType>;
};

const ActionsBarDataTable = ({ table }: ActionsBarDataTableProps) => {
  return (
    <div className="flex">
      <Button>
        <Link href={'/admin/product/create'}>Tạo sản phẩm </Link>
      </Button>
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
