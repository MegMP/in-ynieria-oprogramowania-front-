import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Grade } from "../types/Grade";

export const useProjectGrade = (projectId: string | undefined) => {
  const token = localStorage.getItem("token");
  return useQuery<Grade>({
    queryKey: ["projectGrade", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const { data } = await axios.get(
        `http://localhost:8080/grades/projects/${projectId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      return data;
    },
    enabled: !!projectId,
    retry: false,
  });
};
