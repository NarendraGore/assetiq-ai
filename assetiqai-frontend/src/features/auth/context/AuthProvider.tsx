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


  const clearQueryCache = useCallback(() => {
    queryClient.cancelQueries();
    queryClient.removeQueries();
  }, [queryClient]);


  const expiryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (expiryTimer.current) clearTimeout(expiryTimer.current);
    if (idleTimer.current) clearTimeout(idleTimer.current);

    expiryTimer.current = null;
    idleTimer.current = null;
  }, []);


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



      if (delay > 2_147_483_647) return;

      expiryTimer.current = setTimeout(() => endSession("expired"), delay);
    },
    [endSession],
  );

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => endSession("idle"), IDLE_TIMEOUT_MS);
  }, [endSession]);


  useEffect(() => {
    const storedUser = getUser();
    const token = getAccessToken();

    if (storedUser && token && !isTokenExpired(token)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe session restore, see above
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



      if (storedUser.id !== user?.id) {
        clearQueryCache();
      }

      setUser(storedUser);
      scheduleExpiry(token);
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [scheduleExpiry, clearTimers, clearQueryCache, user?.id]);


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
