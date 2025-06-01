import { userOrderColumns } from '@/app/(user)/user/order/column';
import userColumns from '@/app/admin/user/column';
import { useGetOrderTableQuery } from '@/features/order/order.api';
import { OrderSearchParamsType } from '@/types/order.type';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export const useUserOrderTable = (searchParams: OrderSearchParamsType) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState('');

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isFetching } = useGetOrderTableQuery({
    ...searchParams,
    page: pageIndex + 1,
    size: pageSize,
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: userOrderColumns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: data?.pagination.totalPages ?? -1,
    state: {
      pagination: { pageIndex, pageSize },
      globalFilter,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      setPagination({
        pageIndex: next.pageIndex,
        pageSize: next.pageSize,
      });
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: (updater) => {
      console.log(updater);
    },
  });

  return {
    table,
    isFetching,
    globalFilter,
    setGlobalFilter,
    columns: userColumns,
  };
};
