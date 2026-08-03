"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Supplier } from "../types";

import DataTable from "@/components/tables/DataTable";

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
        enablePagination
        pageSize={10}
        onRowClick={onRowClick}
      />
    </section>
  );
}
