import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import authService from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      

      // Save complete login response
      login(data);

      toast.success("Login successful");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    },

    onError: (error: any) => {
      console.error(error);

      toast.error(
        error?.response?.data?.message ??
          "Invalid email or password."
      );
    },
  });
}