import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { UserUpdateRequest } from "../types/UserUpdateRequest.ts";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: UserUpdateRequest) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      return axios
        .put(`http://localhost:8080/users/${userId}`, data, {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
  });
};
