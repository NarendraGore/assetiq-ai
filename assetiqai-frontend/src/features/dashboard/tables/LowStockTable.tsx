"use client";

import { useMemo, useState } from "react";

import {
  DataTable,
  TableToolbar,
  TableSkeleton,
  EmptyTable,
  DataTableError,
} from "@/components/tables";

import { useLowStock } from "../hooks/useLowStock";
import { lowStockColumns } from "./columns/lowStockColumns";

export default function LowStockTable() {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useLowStock();

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const keyword = search.toLowerCase();

    return data.filter((product) =>
      [
        product.productName,
        product.sku,
        product.categoryName,
        product.companyName,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [data, search]);

  if (isLoading) {
    return <TableSkeleton rows={8} columns={8} />;
  }

  if (isError) {
    return (
      <DataTableError
        message={error?.message ?? "Failed to load low stock products."}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-4">
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        totalRecords={filteredData.length}
        onRefresh={refetch}
      />

      {!filteredData.length ? (
        <EmptyTable
          title="No Low Stock Products"
          description="All products currently have sufficient inventory."
        />
      ) : (
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            dark:border-slate-800
            dark:bg-slate-950
          "
        >
          <DataTable
            columns={lowStockColumns}
            data={filteredData}
            loading={isLoading || isRefetching}
          />
        </div>
      )}
    </div>
  );
}
