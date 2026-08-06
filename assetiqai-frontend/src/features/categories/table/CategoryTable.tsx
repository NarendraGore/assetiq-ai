"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Category } from "../types";

import DataTable from "@/components/tables/DataTable";
import ServerPagination from "@/components/tables/ServerPagination";

import CategorySkeleton from "./CategorySkeleton";
import CategoryEmptyState from "./CategoryEmptyState";

interface CategoryTableProps {
  columns: ColumnDef<Category>[];
  data: Category[];

  isLoading?: boolean;
  isError?: boolean;

  onRetry?: () => void;

  emptyTitle?: string;
  emptyDescription?: string;

  onAddCategory?: () => void;

  onRowClick?: (category: Category) => void;

  /* Server pagination — the API returns one page at a time, so paging must be
     driven by the response rather than the TanStack row model. */
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function CategoryTable({
  columns,
  data,

  isLoading = false,
  isError = false,

  onRetry,

  emptyTitle = "No categories found",
  emptyDescription = "Create your first category to start organizing your inventory.",

  onAddCategory,

  onRowClick,

  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: CategoryTableProps) {
  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (isError) {
    return (
      <CategoryEmptyState
        title="Unable to load categories"
        description="Something went wrong while loading categories."
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (data.length === 0) {
    return (
      <CategoryEmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Add Category"
        onAction={onAddCategory}
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
