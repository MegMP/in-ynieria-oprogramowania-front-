import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Topic } from "../types/Topic";

type CreateTopicRequest = Omit<Topic, "id">;

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTopicRequest) => {
      const token = localStorage.getItem("token");
      return axios
        .post("http://localhost:8080/topics", data, {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};
