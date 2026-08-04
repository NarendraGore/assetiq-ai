"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import type {
  AuthContextType,
  AuthProviderProps,
  User,
} from "../types/auth.types";

import * as authApi from "../api/auth.api";

import {
  saveAuthData,
  clearAuthData,
  getUser,
  getRefreshToken,
  getAccessToken,
  getTokenExpiry,
  isTokenExpired,
  buildLoginUrl,
  AUTH_EVENT_KEY,
  ACCESS_TOKEN_KEY,
} from "../utils/token";

import {
  ACTIVITY_EVENTS,
  IDLE_TIMEOUT_MS,
  type SessionEndReason,
} from "../constants/session";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  /**
   * Every cached response belongs to the account that fetched it. Without this
   * the next person to sign in on the same browser sees the previous user's
   * dashboard, tables and report rows rendered from cache until each query
   * refetches — and with `refetchOnMount: false` some never do.
   */
  const clearQueryCache = useCallback(() => {
    queryClient.cancelQueries();
    queryClient.removeQueries();
  }, [queryClient]);

  /** Timers are refs so re-renders never reset a running countdown. */
  const expiryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (expiryTimer.current) clearTimeout(expiryTimer.current);
    if (idleTimer.current) clearTimeout(idleTimer.current);

    expiryTimer.current = null;
    idleTimer.current = null;
  }, []);

  /**
   * Tear down the session and send the user to login with a reason, so the
   * screen can explain *why* they were signed out instead of silently
   * bouncing them. `returnUrl` preserves the page they were on.
   */
  const endSession = useCallback(
    (reason: SessionEndReason) => {
      clearTimers();
      clearAuthData();
      clearQueryCache();
      setUser(null);

      if (typeof window === "undefined") return;

      const { pathname, search } = window.location;

      const target = new URL(
        buildLoginUrl(`${pathname}${search}`),
        window.location.origin,
      );

      if (reason !== "manual") {
        target.searchParams.set("reason", reason);
      }

      window.location.replace(target.toString());
    },
    [clearTimers, clearQueryCache],
  );

  /** Sign out the moment the access token's `exp` passes. */
  const scheduleExpiry = useCallback(
    (token: string) => {
      if (expiryTimer.current) clearTimeout(expiryTimer.current);

      const expiry = getTokenExpiry(token);

      if (expiry === null) return;

      const delay = expiry - Date.now();

      if (delay <= 0) {
        endSession("expired");

        return;
      }

      // setTimeout caps out around 24.8 days; longer sessions are re-checked
      // on the next mount or activity instead.
      if (delay > 2_147_483_647) return;

      expiryTimer.current = setTimeout(() => endSession("expired"), delay);
    },
    [endSession],
  );

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => endSession("idle"), IDLE_TIMEOUT_MS);
  }, [endSession]);

  /**
   * Restore the session on first paint. A token that is present but already
   * expired is treated as no session at all, which avoids a doomed request
   * and a redirect flash.
   */
  useEffect(() => {
    const storedUser = getUser();
    const token = getAccessToken();

    if (storedUser && token && !isTokenExpired(token)) {
      setUser(storedUser);
      scheduleExpiry(token);
      resetIdleTimer();
    } else {
      if (token || storedUser) clearAuthData();

      setUser(null);
    }

    setLoading(false);

    return clearTimers;
  }, [scheduleExpiry, resetIdleTimer, clearTimers]);

  /**
   * Cross-tab sync. Signing out in one tab must sign out every tab, and
   * signing in elsewhere should not leave this tab showing a stale identity.
   * The `storage` event only fires in *other* tabs, which is exactly right.
   */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== AUTH_EVENT_KEY && event.key !== ACCESS_TOKEN_KEY) {
        return;
      }

      const token = getAccessToken();
      const storedUser = getUser();

      if (!token || !storedUser || isTokenExpired(token)) {
        clearTimers();
        clearQueryCache();
        setUser(null);

        return;
      }

      // A different account signed in elsewhere: drop the previous user's
      // cached responses before adopting the new identity.
      if (storedUser.id !== user?.id) {
        clearQueryCache();
      }

      setUser(storedUser);
      scheduleExpiry(token);
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [scheduleExpiry, clearTimers, clearQueryCache, user?.id]);

  /** Idle tracking only runs while someone is actually signed in. */
  useEffect(() => {
    if (!user) return;

    const onActivity = () => resetIdleTimer();

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, onActivity, { passive: true }),
    );

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, onActivity),
      );
    };
  }, [user, resetIdleTimer]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        setLoading(true);

        const response = await authApi.login({ email, password });

        // Start every session from an empty cache — the browser may still be
        // holding the previous account's data.
        clearQueryCache();

        saveAuthData(
          response.accessToken,
          response.refreshToken,
          response.user,
        );

        setUser(response.user);
        scheduleExpiry(response.accessToken);
        resetIdleTimer();
      } catch (error) {
        clearAuthData();
        setUser(null);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [scheduleExpiry, resetIdleTimer, clearQueryCache],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      const refreshToken = getRefreshToken();

      // Best-effort revocation; a failure here must not trap the user.
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      clearTimers();
      clearAuthData();
      clearQueryCache();
      setUser(null);
    }
  }, [clearTimers, clearQueryCache]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
