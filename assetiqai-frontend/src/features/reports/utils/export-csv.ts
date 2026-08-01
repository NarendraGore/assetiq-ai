import { formatExportFilename } from "./report.helpers";

export interface ExportCsvOptions<T> {
  data: T[];

  fileName: string;
}

export async function exportCsv<T>({
  data,
  fileName,
}: ExportCsvOptions<T>): Promise<void> {
  /*
   * Placeholder implementation.
   *
   * Actual CSV generation will be implemented
   * during the Export phase.
   */

  console.info(
    "CSV Export",
    formatExportFilename(fileName, "csv"),
    data,
  );
}