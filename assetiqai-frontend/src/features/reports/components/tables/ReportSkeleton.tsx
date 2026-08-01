"use client";

import { TableSkeleton } from "@/components/tables";
// ↑ Replace this import with your project's existing shared table skeleton.

interface ReportSkeletonProps {
  rows?: number;
}

export default function ReportSkeleton({ rows = 10 }: ReportSkeletonProps) {
  return <TableSkeleton rows={rows} />;
}
