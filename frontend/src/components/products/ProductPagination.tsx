"use client";

import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

export default function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </Button>

      <span className="text-sm">
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