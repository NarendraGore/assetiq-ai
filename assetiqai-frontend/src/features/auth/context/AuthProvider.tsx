"use client";

import { createContext, useEffect, useMemo, useState } from "react";

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
} from "../utils/token";
import { getAccessToken } from "../utils/token";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = () => {
      const user = getUser();
      const token = getAccessToken();

      if (user && token) {
        setUser(user);
      } else {
        clearAuthData();
        setUser(null);
      }

      setLoading(false);
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      const response = await authApi.login({
        email,
        password,
      });

      saveAuthData(response.accessToken, response.refreshToken, response.user);

      setUser(response.user);
    } catch (error) {
      clearAuthData();
      setUser(null);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        await authApi.logout({
          refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAuthData();
      setUser(null);
    }
  };
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
