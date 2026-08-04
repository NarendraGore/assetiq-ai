"use client";

import DataTable from "@/components/tables/DataTable";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";
import { stockColumns } from "./StockColumns";

import { stockExportColumns } from "../../constants";
import { useReportFilter } from "../../hooks/useReportFilter";
import { useStockReport } from "../../hooks/useStockReport";

export default function StockReportTable() {
  const { filter } = useReportFilter();

  const { data, isLoading, isError, refetch } = useStockReport({
    filters: filter,
  });

  const rows = data?.data ?? [];

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return (
      <ReportEmpty
        title="Unable to load stock report"
        description="Something went wrong while loading the stock report."
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ReportToolbar
        title="Stock Report"
        total={data?.pagination?.totalRecords ?? 0}
        loading={isLoading}
        onRefresh={refetch}
        exportFilename="stock-report"
        exportColumns={stockExportColumns}
        exportData={rows}
      />

      {rows.length === 0 ? (
        <ReportEmpty
          title="No stock transactions found"
          description="Try adjusting your filters or refresh the report."
        />
      ) : (
        <DataTable
          columns={stockColumns}
          data={rows}
          enableSorting
          enablePagination
          pageSize={filter.pageSize}
        />
      )}
    </section>
  );
}
