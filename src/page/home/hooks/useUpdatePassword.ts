import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Password = {
  password: string;
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: Password) => {
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
