import Papa from "papaparse";

import { downloadFile } from "./download-file";
import type { ExportOptions } from "./export-types";

export function exportCsv<T>({
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

  const csv = Papa.unparse(rows);

  downloadFile({
    filename: `${filename}.csv`,
    blob: new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    }),
  });
}