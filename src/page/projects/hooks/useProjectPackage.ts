import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProjectPackage = (projectId: string | undefined) => {
  const token = localStorage.getItem("token");
  return useQuery<Blob>({
    queryKey: ["projectPackage", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const { data } = await axios.get(
        `http://localhost:8080/projects/${projectId}/package`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          responseType: "blob",
        }
      );
      return data;
    },
    enabled: !!projectId,
    retry: false, // Don't retry if 404 (no package)
  });
};
