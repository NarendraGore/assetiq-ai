import api from "./api";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const authService = {
  register: async (request: RegisterRequest) => {
    const response = await api.post("/auth/register", request);
    console.log(`Response Data:${response.data}`)
    debugger;

    return response.data;
  },
};

export default authService;