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
import { useDashboardFilter } from "../hooks/useDashboardFilter";
import { outOfStockColumns } from "./columns/outOfStockColumns";

export default function OutOfStockTable() {
  const { filter } = useDashboardFilter();

  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useOutOfStock(filter);

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
            border-border
            bg-card
            shadow-sm
            transition-all
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
