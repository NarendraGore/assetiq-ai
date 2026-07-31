import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveAuthData,
  clearAuthData,
} from "@/features/auth/utils/token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Custom request type
 */
interface RetryRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Queue item
 */
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

/**
 * Refresh state
 */
let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

let failedQueue: QueueItem[] = [];

/**
 * Process queued requests
 */
function processQueue(
  error: unknown,
  token?: string
) {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token!);
    }
  });

  failedQueue = [];
}

/**
 * REQUEST INTERCEPTOR
 * Attach access token
 */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequest;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /**
     * Only handle 401
     */
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    /**
     * Prevent infinite retry
     */
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    /**
     * Skip auth endpoints
     */
    const authEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/logout",
      "/auth/refresh-token",
    ];

    if (
      authEndpoints.some((endpoint) =>
        url.includes(endpoint)
      )
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /**
     * If refresh already running,
     * wait until it finishes.
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (accessToken) => {
            originalRequest.headers.Authorization =
              `Bearer ${accessToken}`;

            resolve(api(originalRequest));
          },

          reject,
        });
      });
    }

    isRefreshing = true;

    /**
     * Create only one refresh request
     */
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("Refresh token not found.");
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );

        /**
         * Your API returns:
         * {
         *   accessToken,
         *   refreshToken,
         *   expiration,
         *   user
         * }
         */
        const auth = response.data;

        saveAuthData(
          auth.accessToken,
          auth.refreshToken,
          auth.user
        );

        return auth.accessToken as string;
      })();
    }

    try {
      const newAccessToken = await refreshPromise;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      clearAuthData();

      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  }
);

export default api;