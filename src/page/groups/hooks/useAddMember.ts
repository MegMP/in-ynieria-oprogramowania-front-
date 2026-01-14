import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddMember = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => {
      const token = localStorage.getItem("token");
      return axios.post(
        `http://localhost:8080/groups/${groupId}/members`,
        { userId },
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
