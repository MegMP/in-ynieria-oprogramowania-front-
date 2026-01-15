import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Grade } from "../types/Grade";

type GradeRequest = {
  value: string;
  feedback: string;
};

export const useGradeProject = (projectId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: async (data: GradeRequest) => {
      if (!projectId) throw new Error("Project ID is required");

      const response = await axios.post<Grade>(
        `http://localhost:8080/grades/projects/${projectId}`,
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectGrade", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId], // In case status changes
      });
    },
  });
};
