import { User } from "../types/auth.types";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const USER_KEY = "user";

/** Broadcast channel key: bumped on every auth change so other tabs react. */
export const AUTH_EVENT_KEY = "auth-event";

const isBrowser = () => typeof window !== "undefined";

/**
 * Cookie is a *mirror* of the access token so `middleware.ts` can gate routes
 * on the server before any JS runs. The real credential still travels in the
 * Authorization header. Secure is set on https so it is not sent in clear text.
 */
const writeCookie = (token: string, expiresAt: Date | null) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const expires = expiresAt ? `; Expires=${expiresAt.toUTCString()}` : "";

  document.cookie = `${ACCESS_TOKEN_KEY}=${token}; Path=/; SameSite=Lax${secure}${expires}`;
};

const deleteCookie = () => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; SameSite=Lax${secure}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

/**
 * Decode a JWT payload without verifying the signature.
 * Verification is the API's job — we only need `exp` to avoid firing
 * requests we already know will 401.
 */
export const decodeToken = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");

    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

/** Epoch milliseconds at which the access token expires, or null if unknown. */
export const getTokenExpiry = (token: string): number | null => {
  const payload = decodeToken(token);

  const exp = payload?.exp;

  return typeof exp === "number" ? exp * 1000 : null;
};

/**
 * `true` when the token is missing or past its `exp`.
 * A 10s skew guards against the clock drift between browser and server.
 */
export const isTokenExpired = (token: string | null, skewMs = 10_000) => {
  if (!token) return true;

  const expiry = getTokenExpiry(token);

  // No exp claim: let the API be the judge rather than logging the user out.
  if (expiry === null) return false;

  return Date.now() >= expiry - skewMs;
};

export const saveAuthData = (
  accessToken: string,
  refreshToken: string,
  user: User,
) => {
  if (!isBrowser()) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  const expiry = getTokenExpiry(accessToken);

  writeCookie(accessToken, expiry ? new Date(expiry) : null);

  // Notify other tabs (the `storage` event does not fire in the writing tab).
  localStorage.setItem(AUTH_EVENT_KEY, `login:${Date.now()}`);
};

export const getAccessToken = () =>
  isBrowser() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const getRefreshToken = () =>
  isBrowser() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const getUser = (): User | null => {
  if (!isBrowser()) return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch {
    // Corrupted payload would otherwise throw on every render.
    localStorage.removeItem(USER_KEY);

    return null;
  }
};

export const clearAuthData = () => {
  if (!isBrowser()) return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  deleteCookie();

  localStorage.setItem(AUTH_EVENT_KEY, `logout:${Date.now()}`);
};

/**
 * Build a login URL that remembers where the user was headed, so that
 * opening a deep link in a fresh browser lands back on that page after
 * signing in. Guards against open redirects by allowing same-origin paths only.
 */
export const buildLoginUrl = (returnUrl?: string | null) => {
  if (!returnUrl) return "/login";

  const isSafe = returnUrl.startsWith("/") && !returnUrl.startsWith("//");

  if (!isSafe || returnUrl.startsWith("/login")) return "/login";

  return `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
};

/** Only same-origin absolute paths may be used as a post-login destination. */
export const sanitizeReturnUrl = (
  returnUrl: string | null | undefined,
  fallback = "/dashboard",
) => {
  if (!returnUrl) return fallback;

  if (!returnUrl.startsWith("/") || returnUrl.startsWith("//")) return fallback;

  if (returnUrl.startsWith("/login")) return fallback;

  return returnUrl;
};
