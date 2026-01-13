import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (userId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: token === null ? null : `Bearer ${token}`,
        },
      });
    },
  });
};
