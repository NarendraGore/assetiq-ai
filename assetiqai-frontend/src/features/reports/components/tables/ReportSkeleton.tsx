"use client";

import { TableSkeleton } from "@/components/tables";


interface ReportSkeletonProps {
  rows?: number;
}

export default function ReportSkeleton({ rows = 10 }: ReportSkeletonProps) {
  return <TableSkeleton rows={rows} />;
}
