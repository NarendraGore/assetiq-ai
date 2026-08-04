import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveAuthData,
  clearAuthData,
  buildLoginUrl,
} from "@/features/auth/utils/token";

/**
 * `.trim()` guards against a stray space in .env.local, which would otherwise
 * produce request URLs like " https://host/api/..." that fail to resolve.
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL?.trim();

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RetryRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let refreshPromise: Promise<string> | null = null;

let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token?: string) {
  failedQueue.forEach((request) => {
    if (error || !token) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });

  failedQueue = [];
}

/**
 * Refresh failed for good: drop the session and bounce to login, keeping the
 * current page as returnUrl so the user resumes there after signing in.
 */
function redirectToLogin() {
  if (typeof window === "undefined") return;

  clearAuthData();

  const { pathname, search } = window.location;

  const target = new URL(
    buildLoginUrl(`${pathname}${search}`),
    window.location.origin,
  );

  target.searchParams.set("reason", "expired");

  window.location.replace(target.toString());
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/** Endpoints where a 401 is a real answer, not a signal to refresh. */
const authEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  "/auth/refresh-token",
];

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequest | undefined;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status !== 401) return Promise.reject(error);

    // Already retried once — refreshing again would loop.
    if (originalRequest._retry) return Promise.reject(error);

    const url = originalRequest.url ?? "";

    if (authEndpoints.some((endpoint) => url.includes(endpoint))) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /**
     * A refresh is already in flight: queue this request and replay it with
     * the new token rather than firing a second refresh.
     */
    if (refreshPromise) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    refreshPromise = (async () => {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error("Refresh token not found.");
      }

      // Plain axios: using `api` here would recurse through this interceptor.
      const response = await axios.post(
        `${baseURL}/auth/refresh-token`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const auth = response.data;

      saveAuthData(auth.accessToken, auth.refreshToken, auth.user);

      return auth.accessToken as string;
    })();

    try {
      const newAccessToken = await refreshPromise;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      redirectToLogin();

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);

export default api;
