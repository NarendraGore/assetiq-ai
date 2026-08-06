"use client";

import { FileSpreadsheet, FileText } from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ExportDropdownProps {
  onCsvExport: () => void;
  onExcelExport: () => void;
}

export default function ExportDropdown({
  onCsvExport,
  onExcelExport,
}: ExportDropdownProps) {
  return (
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className="
        w-48
        rounded-xl
        border-border
        bg-popover
        shadow-md
      "
    >
      <DropdownMenuItem
        onClick={onCsvExport}
        className="
          cursor-pointer
          transition-colors
          duration-200
          focus:bg-muted
        "
      >
        <FileText className="mr-2 h-4 w-4 text-primary" />
        Export as CSV
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={onExcelExport}
        className="
          cursor-pointer
          transition-colors
          duration-200
          focus:bg-muted
        "
      >
        <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" />
        Export as Excel
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
