import api from "@/src/lib/axios";

// Login
export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

// Register
export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

// Refresh Token
export const refreshToken = async (refreshToken: string) => {
  const res = await api.post("/api/auth/refresh-token", { refreshToken });
  return res.data;
};

// Logout
export const logout = async (refreshToken?: string) => {
  const res = await api.post("/api/auth/logout", { refreshToken });
  return res.data;
};

// Get Profile
export const getProfile = async () => {
  const res = await api.get("/api/auth/profile");
  return res.data;
};
