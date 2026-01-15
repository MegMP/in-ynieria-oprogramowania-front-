import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteGrade = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gradeId: string) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://localhost:8080/grades/${gradeId}`, {
        headers: {
          Authorization: token === null ? null : `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectGrade", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
  });
};
