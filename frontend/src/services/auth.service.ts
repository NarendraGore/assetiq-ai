import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post("/auth/login", data),

  refreshToken: () =>
    api.post("/auth/refresh-token"),

  logout: () =>
    api.post("/auth/logout"),
};