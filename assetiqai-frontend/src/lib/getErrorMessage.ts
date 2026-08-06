import { AxiosError } from "axios";

/**
 * Pull a human-readable message off an unknown error.
 * Replaces `catch (error: any)`, which silently disabled type checking on
 * every property access downstream.
 *
 * Handles the API's `ApiResponse` envelope, whose useful text lives in an
 * `errors` array (the top-level `message`/`Message` is only a generic title
 * like "Conflict"). Property casing is matched both ways because the exception
 * middleware serializes with PascalCase while other endpoints use camelCase.
 */
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

    // Prefer a specific error from the envelope's errors array, if present.
    const errorsList = data?.errors ?? data?.Errors;
    if (Array.isArray(errorsList)) {
      const first = errorsList.find(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      );
      if (first) return first;
    }

    // Generic envelope titles ("Conflict", "Internal Server Error", …) aren't
    // helpful on their own, so fall back rather than surface them.
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
