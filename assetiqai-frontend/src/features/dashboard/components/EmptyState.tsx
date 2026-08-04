"use client";

import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  /** Optional call-to-action (e.g. a Retry button) rendered under the copy. */
  action?: ReactNode;
}

export default function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display.",
  action,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-border
        bg-background
        py-14
        text-center
      "
    >
      <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
