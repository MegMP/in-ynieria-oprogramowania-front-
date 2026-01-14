import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { GroupDetails } from "../types/GroupDetails";

export const useGroup = (groupId: string | undefined) => {
  const token = localStorage.getItem("token");
  return useQuery<GroupDetails>({
    queryKey: ["group", groupId],
    queryFn: async () => {
      if (!groupId) throw new Error("Group ID is required");
      const { data } = await axios.get(
        `http://localhost:8080/groups/${groupId}/members`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      return data;
    },
    enabled: !!groupId,
  });
};
