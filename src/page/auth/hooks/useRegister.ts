import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest } from "../types/RegisterRequest";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      return axios
        .post("http://localhost:8080/auth/register", data)
        .then((res) => res.data);
    },
  });
};
