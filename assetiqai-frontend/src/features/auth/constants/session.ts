/**
 * Session tuning. Kept in one place so the provider, the axios interceptor
 * and the middleware cannot drift apart.
 */

/** Sign out after this much time with no user interaction. */
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

/** DOM events that count as "the user is still here". */
export const ACTIVITY_EVENTS = [
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "visibilitychange",
] as const;

/** Why a session ended — drives the message shown on the login screen. */
export type SessionEndReason = "manual" | "expired" | "idle";

export const SESSION_END_MESSAGE: Record<
  Exclude<SessionEndReason, "manual">,
  string
> = {
  expired: "Your session has expired. Please sign in again.",
  idle: "You were signed out after a period of inactivity.",
};
