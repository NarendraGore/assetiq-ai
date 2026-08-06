


export const IDLE_TIMEOUT_MS = 30 * 60 * 1000;


export const ACTIVITY_EVENTS = [
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "visibilitychange",
] as const;


export type SessionEndReason = "manual" | "expired" | "idle";

export const SESSION_END_MESSAGE: Record<
  Exclude<SessionEndReason, "manual">,
  string
> = {
  expired: "Your session has expired. Please sign in again.",
  idle: "You were signed out after a period of inactivity.",
};
