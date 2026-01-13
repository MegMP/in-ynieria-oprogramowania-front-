import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Project } from "../types/Project";

export const useProjects = () => {
  const token = localStorage.getItem("token");
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/projects", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return data;
    },
  });
};
