import api from "@/lib/axios";

import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  LogoutDto,
  AuthResponse,
  ProfileResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  MessageResponse,
} from "../types/auth.types";


export const register = async (
  data: RegisterDto
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};


export const login = async (
  data: LoginDto
): Promise<AuthResponse> => {

  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};


export const refreshToken = async (
  data: RefreshTokenDto
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/refresh-token",
    data
  );

  return response.data;
};


export const forgotPassword = async (
  data: ForgotPasswordDto
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/forgot-password",
    data
  );

  return response.data;
};


export const resetPassword = async (
  data: ResetPasswordDto
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/reset-password",
    data
  );

  return response.data;
};


export const logout = async (
  data: LogoutDto
): Promise<void> => {
  await api.post("/auth/logout", data);
};


export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>("/auth/profile");

  return response.data;
};


export const getPublicMessage = async (): Promise<string> => {
  const response = await api.get("/auth/public");

  return response.data;
};