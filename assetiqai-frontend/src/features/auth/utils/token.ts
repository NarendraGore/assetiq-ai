import { User } from "../types/auth.types";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const USER_KEY = "user";


export const AUTH_EVENT_KEY = "auth-event";

const isBrowser = () => typeof window !== "undefined";


const writeCookie = (token: string, expiresAt: Date | null) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const expires = expiresAt ? `; Expires=${expiresAt.toUTCString()}` : "";

  document.cookie = `${ACCESS_TOKEN_KEY}=${token}; Path=/; SameSite=Lax${secure}${expires}`;
};

const deleteCookie = () => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; SameSite=Lax${secure}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};


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


export const getTokenExpiry = (token: string): number | null => {
  const payload = decodeToken(token);

  const exp = payload?.exp;

  return typeof exp === "number" ? exp * 1000 : null;
};


export const isTokenExpired = (token: string | null, skewMs = 10_000) => {
  if (!token) return true;

  const expiry = getTokenExpiry(token);


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


export const buildLoginUrl = (returnUrl?: string | null) => {
  if (!returnUrl) return "/login";

  const isSafe = returnUrl.startsWith("/") && !returnUrl.startsWith("//");

  if (!isSafe || returnUrl.startsWith("/login")) return "/login";

  return `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
};


export const sanitizeReturnUrl = (
  returnUrl: string | null | undefined,
  fallback = "/dashboard",
) => {
  if (!returnUrl) return fallback;

  if (!returnUrl.startsWith("/") || returnUrl.startsWith("//")) return fallback;

  if (returnUrl.startsWith("/login")) return fallback;

  return returnUrl;
};
