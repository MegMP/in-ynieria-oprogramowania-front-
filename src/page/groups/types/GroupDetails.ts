import { type UserResponse } from "../../home/types/UserResponse";
import { type Group } from "./Group";

export type GroupDetails = Group & {
  users: UserResponse[];
};
