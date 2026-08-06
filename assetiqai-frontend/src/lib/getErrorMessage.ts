import { AxiosError } from "axios";


export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | {
          message?: string;
          Message?: string;
          title?: string;
          detail?: string;
          errors?: unknown;
          Errors?: unknown;
        }
      | undefined;


    const errorsList = data?.errors ?? data?.Errors;
    if (Array.isArray(errorsList)) {
      const first = errorsList.find(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      );
      if (first) return first;
    }



    const generic = new Set([
      "conflict",
      "internal server error",
      "bad request",
      "resource not found",
      "validation failed",
      "unauthorized",
    ]);

    const topLevel = data?.message ?? data?.Message ?? data?.title ?? data?.detail;
    if (topLevel && !generic.has(topLevel.trim().toLowerCase())) {
      return topLevel;
    }

    return fallback;
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}
