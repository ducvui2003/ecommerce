import userColumns from '@/app/admin/user/column';
import { useGetUserTableQuery } from '@/features/manager/user/user.api';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';

export const useUserTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState('');

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const getFilterValue = useCallback(
    (filters: ColumnFiltersState, id: string): string => {
      return (filters.find((f) => f.id === id)?.value ?? '') as string;
    },
    [],
  );

  const { data, isFetching } = useGetUserTableQuery({
    page: pageIndex + 1,
    size: pageSize,
    email: getFilterValue(columnFilters, 'email'),
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: userColumns,
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
