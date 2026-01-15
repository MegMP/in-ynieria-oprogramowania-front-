import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUploadProjectPackage = (projectId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: async (file: File) => {
      if (!projectId) throw new Error("Project ID is required");
      const userId = localStorage.getItem("userId");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      if (userId) {
        formData.append("uploadedBy", userId);
      }

      await axios.post(`http://localhost:8080/documents/upload`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined},
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectPackage", projectId],
      });
    },
  });
};
