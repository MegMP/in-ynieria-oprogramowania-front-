import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Project } from "../types/Project";

type CreateProjectRequest = Omit<Project, "id">;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => {
      const token = localStorage.getItem("token");
      return axios
        .post("http://localhost:8080/projects", data, {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
