export interface DownloadFileOptions {
  filename: string;

  blob: Blob;
}

export function downloadFile({
  filename,
  blob,
}: DownloadFileOptions): void {
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}