import { z } from "zod";

export const GroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  topicId: z.string().min(1, "Topic is required"),
});
