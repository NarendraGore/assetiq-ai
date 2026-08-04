"use client";

import { Download, FileSpreadsheet, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ExportType } from "../../types";

interface ExportButtonProps {
  type: ExportType;
  loading?: boolean;
  disabled?: boolean;
  onExport?: () => void;
}

export default function ExportButton({
  type,
  loading = false,
  disabled = false,
  onExport,
}: ExportButtonProps) {
  const isCsv = type === "csv";

  const Icon = isCsv ? Download : FileSpreadsheet;

  const label = isCsv ? "Export CSV" : "Export Excel";

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled || loading}
      onClick={onExport}
      aria-label={label}
      className="
        h-11
        rounded-xl
        border-border
        bg-background
        px-5
        shadow-sm
        transition-all
        duration-200

        hover:border-primary/40
        hover:bg-muted
        hover:shadow-md

        focus-visible:ring-2
        focus-visible:ring-ring/20
      "
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Icon className="mr-2 h-4 w-4 text-primary" />
          {label}
        </>
      )}
    </Button>
  );
}
