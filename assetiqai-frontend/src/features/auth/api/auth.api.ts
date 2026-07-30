import api from "@/src/lib/axios";

// Register a new user
export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

// Login
export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

// Refresh token
export const refreshToken = async (refreshToken: string) => {
  const res = await api.post("/api/auth/refresh-token", { refreshToken });
  return res.data;
};

// Logout
export const logout = async (refreshToken: string) => {
  const res = await api.post("/api/auth/logout", { refreshToken });
  return res.data;
};

// Get profile
export const getProfile = async () => {
  const res = await api.get("/api/auth/profile");
  return res.data;
};

// Role-based endpoints
export const getAdminData = async () => api.get("/api/auth/admin").then(res => res.data);
export const getManagerData = async () => api.get("/api/auth/manager").then(res => res.data);
export const getEmployeeData = async () => api.get("/api/auth/employee").then(res => res.data);
export const getReportsData = async () => api.get("/api/auth/reports").then(res => res.data);
