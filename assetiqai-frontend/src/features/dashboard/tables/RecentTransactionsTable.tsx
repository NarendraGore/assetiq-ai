"use client";

import { useMemo, useState } from "react";

import {
  DataTable,
  TableToolbar,
  TableSkeleton,
  EmptyTable,
  DataTableError,
} from "@/components/tables";

import { useRecentTransactions } from "../hooks/useRecentTransactions";
import { recentTransactionsColumns } from "./columns/recentTransactionsColumns";
import { useDashboardFilter } from "../hooks";

export default function RecentTransactionsTable() {
  const [search, setSearch] = useState("");
  const { filter } = useDashboardFilter();
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useRecentTransactions(filter);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const value = search.toLowerCase();

    return data.filter((transaction) =>
      [transaction.productName, transaction.createdBy, transaction.remarks]
        .filter(Boolean)
        .some((item) => item.toLowerCase().includes(value)),
    );
  }, [data, search]);

  if (isLoading) {
    return <TableSkeleton rows={8} columns={8} />;
  }

  if (isError) {
    return (
      <DataTableError
        message={error?.message ?? "Failed to load recent transactions."}
        onRetry={refetch}
      />
    );
  }

  if (!filteredData.length) {
    return (
      <>
        <TableToolbar
          search={search}
          onSearchChange={setSearch}
          totalRecords={data.length}
          onRefresh={refetch}
        />

        <EmptyTable
          title="No Transactions Found"
          description="No recent inventory transactions are available."
        />
      </>
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

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-colors
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <DataTable
          columns={recentTransactionsColumns}
          data={filteredData}
          loading={isLoading || isRefetching}
        />
      </div>
    </div>
  );
}
