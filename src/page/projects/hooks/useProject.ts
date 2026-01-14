import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Project } from "../types/Project";

export const useProject = (projectId: string | undefined) => {
  const token = localStorage.getItem("token");
  return useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const { data } = await axios.get(
        `http://localhost:8080/projects/${projectId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      return data;
    },
    enabled: !!projectId,
  });
};
