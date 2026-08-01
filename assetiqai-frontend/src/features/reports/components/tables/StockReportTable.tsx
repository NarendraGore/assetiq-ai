"use client";

import DataTable from "@/components/tables/DataTable";

import ReportToolbar from "./ReportToolbar";
import ReportSkeleton from "./ReportSkeleton";
import ReportEmpty from "./ReportEmpty";

import { stockColumns } from "./StockColumns";

import { useReportFilter } from "../../hooks/useReportFilter";
import { useStockReport } from "../../hooks/useStockReport";

export default function StockReportTable() {
  const { filter } = useReportFilter();

  const { data, isLoading, isError, refetch } = useStockReport({
    filters: filter,
  });

  if (isLoading) {
    return <ReportSkeleton />;
  }

  if (isError) {
    return (
      <ReportEmpty
        title="Unable to load stock report"
        description="Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const rows = data?.items ?? [];

  if (!rows.length) {
    return <ReportEmpty />;
  }

  return (
    <section className="space-y-4">
      <ReportToolbar
        title="Stock Report"
        total={data?.totalCount}
        loading={isLoading}
        onRefresh={refetch}
        exportFilename="stock-report"
        exportColumns={stockExportColumns}
        exportData={rows}
      />

      <DataTable
        columns={stockColumns}
        data={rows}
        enableSorting
        enablePagination
        pageSize={filter.pageSize}
      />
    </section>
  );
}
