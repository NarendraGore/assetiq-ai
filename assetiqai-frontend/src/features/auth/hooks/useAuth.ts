"use client";
import { useState, useEffect, useCallback } from "react";
import { login, logout, refreshToken, getProfile } from "../api/auth.api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load profile on mount
  useEffect(() => {
    const init = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Login
  const handleLogin = useCallback(async (email: string, password: string) => {
    const data = await login({ email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  }, []);

  // Logout
  const handleLogout = useCallback(async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) await logout(refresh);
    localStorage.clear();
    setUser(null);
  }, []);

  // Refresh token
  const handleRefresh = useCallback(async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return;
    const data = await refreshToken(refresh);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRefresh };
}
