import api from "./api";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;

    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    };
}

const authService = {

    login: async (
        request: LoginRequest
    ) => {

        const response =
            await api.post<LoginResponse>(
                "/auth/login",
                request
            );

        return response.data;
    },

    refreshToken: async (
        refreshToken: string
    ) => {

        const response =
            await api.post(
                "/auth/refresh-token",
                {
                    refreshToken,
                }
            );

        return response.data;
    },

    logout: async () => {

        await api.post("/auth/logout");

    },

};

export default authService;