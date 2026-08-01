"use client";

import { ChevronDown, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { exportCsv, exportExcel, type ExportColumn } from "@/shared/export";

import ExportDropdown from "./ExportDropdown";

interface ExportButtonProps<T> {
  filename: string;

  columns: ExportColumn<T>[];

  data: readonly T[];

  disabled?: boolean;

  className?: string;
}

export default function ExportButton<T>({
  filename,
  columns,
  data,
  disabled = false,
  className,
}: ExportButtonProps<T>) {
  const isDisabled = disabled || data.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={isDisabled}
          aria-label="Export data"
          className={`
            rounded-xl
            border-border
            shadow-sm
            transition-all
            duration-200
            hover:bg-muted
            hover:shadow-md
            focus-visible:ring-2
            focus-visible:ring-blue-500
            ${className ?? ""}
          `}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <ExportDropdown
        onCsvExport={() =>
          exportCsv({
            filename,
            columns,
            data,
          })
        }
        onExcelExport={() =>
          exportExcel({
            filename,
            columns,
            data,
          })
        }
      />
    </DropdownMenu>
  );
}
