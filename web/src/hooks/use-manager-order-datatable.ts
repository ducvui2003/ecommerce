import orderColumns from '@/app/admin/order/column';
import productColumns from '@/app/admin/product/column';
import { useGetOrderTableQuery } from '@/features/manager/order/order.api';
import { useGetProductTableQuery } from '@/features/manager/product/product.api';
import { OrderManagerSearchParamsType } from '@/types/order.type';
import { SearchParams } from '@/types/product.type';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

export const useOrderTable = (searchParams: OrderManagerSearchParamsType) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    salePrice: false,
    supplier: false,
    createdAt: false,
  });

  const [globalFilter, setGlobalFilter] = useState('');

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isFetching } = useGetOrderTableQuery({
    page: pageIndex + 1,
    size: pageSize,
    ...searchParams,
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: orderColumns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: data?.pagination.totalPages ?? -1,
    state: {
      pagination: { pageIndex, pageSize },
      globalFilter,
      columnFilters,
      columnVisibility,
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
    onColumnVisibilityChange: setColumnVisibility,
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
    columns: productColumns,
  };
};
