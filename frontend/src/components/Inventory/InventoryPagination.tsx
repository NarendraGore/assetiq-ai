"use client";

import { Button } from "@/components/ui/button";

interface InventoryPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

export default function InventoryPagination({
  page,
  totalPages,
  onPageChange,
}: InventoryPaginationProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </Button>
    </div>
  );
}