"use client";

import { Button } from "@/components/ui/button";

interface CategoryPaginationProps {
  page: number;
  totalPages: number;

  onPageChange: (page: number) => void;
}

export default function CategoryPagination({
  page,
  totalPages,
  onPageChange,
}: CategoryPaginationProps) {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </Button>

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
    </div>
  );
}