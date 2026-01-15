import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { GroupDetails } from "../types/GroupDetails";

export const useGroup = (groupId: string | undefined) => {
  const token = localStorage.getItem("token");
  return useQuery<GroupDetails>({
    queryKey: ["group", groupId],
    queryFn: async () => {
      if (!groupId) throw new Error("Group ID is required");

      const groupPromise = axios.get(
        `http://localhost:8080/groups/${groupId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      const membersPromise = axios.get(
        `http://localhost:8080/groups/${groupId}/members`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      const [groupRes, membersRes] = await Promise.all([
        groupPromise,
        membersPromise,
      ]);

      const groupData = groupRes.data;
      const membersData = membersRes.data;

      // Transform members data to match the GroupDetails type
      const users = Array.isArray(membersData)
        ? membersData.map((item: any) => ({ user: item.user }))
        : [];

      return {
        ...groupData,
        users: users,
      };
    },
    enabled: !!groupId,
  });
};
