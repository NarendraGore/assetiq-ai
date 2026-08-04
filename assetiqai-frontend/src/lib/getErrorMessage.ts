import { AxiosError } from "axios";

/**
 * Pull a human-readable message off an unknown error.
 * Replaces `catch (error: any)`, which silently disabled type checking on
 * every property access downstream.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | { message?: string; title?: string; detail?: string }
      | undefined;

    return data?.message ?? data?.title ?? data?.detail ?? fallback;
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}
