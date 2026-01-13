import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { AuthResponse } from "../types/AuthResponse";
import type { AuthRequest } from "../types/AuthRequest";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const loginMutation = useMutation<AuthResponse, AxiosError, AuthRequest>({
    mutationFn: (data: AuthRequest) => {
      return axios
        .post("http://localhost:8080/auth/login", data)
        .then((res) => res.data);
    },
  });

  return {
    loginMutation,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError
  };
};
