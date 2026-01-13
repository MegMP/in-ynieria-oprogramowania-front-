import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { UserResponse } from "../types/UserResponse";

export const useUserData = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  return useQuery<UserResponse, AxiosError>({
    queryKey: ["users", userId],
    queryFn: () => {
      return axios
        .get(`http://localhost:8080/users/${userId}`, {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!userId,
    retry: (failureCount, error: AxiosError) => {
      if (error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
