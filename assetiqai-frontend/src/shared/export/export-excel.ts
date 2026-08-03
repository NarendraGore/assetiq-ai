import * as XLSX from "xlsx";

import { downloadFile } from "./download-file";
import type { ExportOptions } from "./export-types";

export function exportExcel<T>({
  filename,
  columns,
  data,
}: ExportOptions<T>): void {
  const rows = data.map((item) => {
    const row: Record<string, string | number | boolean | null> = {};

    columns.forEach((column) => {
      const value = item[column.key];

      row[column.header] = column.formatter
        ? column.formatter(value, item)
        : (value as string | number | boolean | null);
    });

    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = columns.map((column) => ({
    wch: Math.max(column.header.length + 4, 18),
  }));

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Export",
  );

  const buffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  downloadFile({
    filename: `${filename}.xlsx`,
    blob: new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
  });
}