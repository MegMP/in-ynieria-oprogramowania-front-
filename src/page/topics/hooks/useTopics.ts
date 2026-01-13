import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Topic } from "../types/Topic";

export const useTopics = () => {
  const token = localStorage.getItem("token");
  return useQuery<Topic[]>({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/topics", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return data;
    },
  });
};
