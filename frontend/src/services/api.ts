import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authStorage =
        localStorage.getItem("auth-storage");

      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage);

          if (state?.accessToken) {
            config.headers.Authorization =
              `Bearer ${state.accessToken}`;
          }
        } catch (error) {
          console.error("Auth Storage Error", error);
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;