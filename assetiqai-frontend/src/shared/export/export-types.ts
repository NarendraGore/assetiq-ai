export interface ExportColumn<T> {

  header: string;


  key: keyof T;


  formatter?: (value: T[keyof T], row: T) => string | number | boolean | null;
}

export interface ExportOptions<T> {
  filename: string;

  columns: ReadonlyArray<ExportColumn<T>>;

  data: readonly T[];
}