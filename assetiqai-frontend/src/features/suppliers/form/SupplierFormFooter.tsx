"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SupplierFormFooterProps {
  mode?: "create" | "edit";

  loading?: boolean;

  disabled?: boolean;

  onCancel: () => void;
}

export function SupplierFormFooter({
  mode = "create",
  loading = false,
  disabled = false,
  onCancel,
}: SupplierFormFooterProps) {
  const submitLabel = mode === "create" ? "Create Supplier" : "Update Supplier";

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
        className="w-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

        {submitLabel}
      </Button>
    </div>
  );
}
