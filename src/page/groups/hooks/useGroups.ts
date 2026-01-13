import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Group } from "../types/Group";

export const useGroups = () => {
  const token = localStorage.getItem("token");
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/groups", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return data;
    },
  });
};
