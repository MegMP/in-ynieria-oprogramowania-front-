import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useRemoveMember = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(
        `http://localhost:8080/groups/${groupId}/members/${userId}`,
        {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};
