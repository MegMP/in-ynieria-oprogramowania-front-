import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topicId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://localhost:8080/topics/${topicId}`, {
        headers: {
          Authorization: token === null ? null : `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};
