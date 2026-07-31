"use client";

import { useMemo, useState } from "react";

import {
  DataTable,
  TableToolbar,
  TableSkeleton,
  EmptyTable,
  DataTableError,
} from "@/components/tables";

import { useOutOfStock } from "../hooks/useOutOfStock";
import { outOfStockColumns } from "./columns/outOfStockColumns";

export default function OutOfStockTable() {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useOutOfStock();

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
        message={error?.message ?? "Failed to load out of stock products."}
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
          title="No Out Of Stock Products"
          description="No products are currently out of stock."
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
            columns={outOfStockColumns}
            data={filteredData}
            loading={isLoading || isRefetching}
          />
        </div>
      )}
    </div>
  );
}
