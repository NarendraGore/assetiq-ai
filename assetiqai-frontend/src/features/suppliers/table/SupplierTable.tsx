"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Supplier } from "../types";

import DataTable from "@/components/tables/DataTable";
import ServerPagination from "@/components/tables/ServerPagination";

import SupplierSkeleton from "./SupplierSkeleton";
import SupplierEmptyState from "./SupplierEmptyState";

interface SupplierTableProps {
  columns: ColumnDef<Supplier>[];
  data: Supplier[];

  isLoading?: boolean;
  isError?: boolean;

  /**
   * Drives the empty-state copy: a search that returns nothing is not
   * the same as an inventory with no suppliers yet.
   */
  isSearchResult?: boolean;

  onRetry?: () => void;

  emptyTitle?: string;
  emptyDescription?: string;

  onAddSupplier?: () => void;

  onRowClick?: (supplier: Supplier) => void;

  /* Server pagination — the API returns one page at a time, so paging must be
     driven by the response rather than the TanStack row model. */
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function SupplierTable({
  columns,
  data,

  isLoading = false,
  isError = false,

  isSearchResult = false,

  onRetry,

  emptyTitle,
  emptyDescription,

  onAddSupplier,

  onRowClick,

  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: SupplierTableProps) {
  if (isLoading) {
    return <SupplierSkeleton />;
  }

  if (isError) {
    return (
      <SupplierEmptyState
        title="Unable to load suppliers"
        description="Something went wrong while loading suppliers."
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (data.length === 0) {
    return (
      <SupplierEmptyState
        title={emptyTitle}
        description={emptyDescription}
        isSearchResult={isSearchResult}
        actionLabel="Add Supplier"
        onAction={onAddSupplier}
      />
    );
  }

  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-card
        shadow-sm
      "
    >
      <DataTable
        columns={columns}
        data={data}
        enableSorting
        enablePagination={false}
        onRowClick={onRowClick}
      />

      <ServerPagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </section>
  );
}
