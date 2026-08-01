import { formatExportFilename } from "./report.helpers";

export interface ExportExcelOptions<T> {
  data: T[];

  fileName: string;
}

export async function exportExcel<T>({
  data,
  fileName,
}: ExportExcelOptions<T>): Promise<void> {
  /*
   * Placeholder implementation.
   *
   * XLSX generation will be implemented
   * during the Excel Export phase.
   */

  console.info(
    "Excel Export",
    formatExportFilename(fileName, "xlsx"),
    data,
  );
}