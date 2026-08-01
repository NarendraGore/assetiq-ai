export interface ExportColumn<T> {
  /**
   * Column title shown in exported file.
   */
  header: string;

  /**
   * Object property.
   */
  key: keyof T;

  /**
   * Optional formatter.
   */
  formatter?: (value: T[keyof T], row: T) => string | number | boolean | null;
}

export interface ExportOptions<T> {
  filename: string;

  columns: ExportColumn<T>[];

  data: readonly T[];
}