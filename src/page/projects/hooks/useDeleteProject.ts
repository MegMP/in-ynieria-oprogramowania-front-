import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://localhost:8080/projects/${projectId}`, {
        headers: {
          Authorization: token === null ? null : `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
