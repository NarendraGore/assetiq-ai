const TOKEN_KEY = "accessToken";

export const token = {
  get: () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  set: (value: string) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(TOKEN_KEY, value);
  },

  remove: () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(TOKEN_KEY);
  },
};