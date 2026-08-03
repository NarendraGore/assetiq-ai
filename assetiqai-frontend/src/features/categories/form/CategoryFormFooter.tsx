"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CategoryFormFooterProps {
  mode?: "create" | "edit";

  loading?: boolean;

  disabled?: boolean;

  onCancel: () => void;
}

export function CategoryFormFooter({
  mode = "create",
  loading = false,
  disabled = false,
  onCancel,
}: CategoryFormFooterProps) {
  const submitLabel = mode === "create" ? "Create Category" : "Update Category";

  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>

      <Button
        type="submit"
        disabled={loading || disabled}
        className="w-full bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

        {submitLabel}
      </Button>
    </div>
  );
}
