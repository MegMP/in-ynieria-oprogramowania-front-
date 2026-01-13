import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Group } from "../types/Group";

type CreateGroupRequest = Omit<Group, "id">;

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupRequest) => {
      const token = localStorage.getItem("token");
      return axios
        .post("http://localhost:8080/groups", data, {
          headers: {
            Authorization: token === null ? null : `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
