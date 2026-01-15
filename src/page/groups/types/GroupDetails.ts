import { type UserResponse } from "../../home/types/UserResponse";
import { type Group } from "./Group";

export type GroupMember = {
  user: UserResponse;
};

export type GroupDetails = Group & {
  users: GroupMember[];
};
