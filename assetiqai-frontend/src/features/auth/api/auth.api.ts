import api from "@/lib/axios";

import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  LogoutDto,
  AuthResponse,
  ProfileResponse,
} from "../types/auth.types";

/**
 * Register
 */
export const register = async (
  data: RegisterDto
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};

/**
 * Login
 */
export const login = async (
  data: LoginDto
): Promise<AuthResponse> => {
  console.log(data)
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};

/**
 * Refresh Token
 */
export const refreshToken = async (
  data: RefreshTokenDto
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/refresh-token",
    data
  );

  return response.data;
};

/**
 * Logout
 */
export const logout = async (
  data: LogoutDto
): Promise<void> => {
  await api.post("/auth/logout", data);
};

/**
 * Get Profile
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>("/auth/profile");

  return response.data;
};

/**
 * Public Endpoint (optional, useful for testing)
 */
export const getPublicMessage = async (): Promise<string> => {
  const response = await api.get("/auth/public");

  return response.data;
};