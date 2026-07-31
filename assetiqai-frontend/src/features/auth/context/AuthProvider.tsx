"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login, logout, refreshToken, getProfile } from "../api/auth.api";

type AuthContextType = {
  user: any;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRefresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const data = await login({ email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
  }, []);

  const handleLogout = useCallback(async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) await logout(refresh);
    localStorage.clear();
    setUser(null);
  }, []);

  const handleRefresh = useCallback(async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return;
    const data = await refreshToken(refresh);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleRefresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
