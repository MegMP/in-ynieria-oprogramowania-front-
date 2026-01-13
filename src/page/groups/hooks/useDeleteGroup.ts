import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://localhost:8080/groups/${groupId}`, {
        headers: {
          Authorization: token === null ? null : `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
