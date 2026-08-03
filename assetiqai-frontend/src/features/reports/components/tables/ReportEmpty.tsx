"use client";

import { Button } from "@/components/ui/button";
import EmptyState from "@/features/dashboard/components/EmptyState";

interface ReportEmptyProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ReportEmpty({
  title = "No report data found",
  description = "Try adjusting filters or refresh the report.",
  onRetry,
}: ReportEmptyProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={
        onRetry ? (
          <Button
            type="button"
            variant="outline"
            onClick={onRetry}
            className="
              transition-all
              duration-200
              focus-visible:ring-2
              focus-visible:ring-blue-500
            "
          >
            Retry
          </Button>
        ) : undefined
      }
    />
  );
}
