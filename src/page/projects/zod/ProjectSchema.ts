import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().min(1, "Deadline is required"),
  topicId: z.string().min(1, "Topic is required"),
  status: z.boolean(),
});
