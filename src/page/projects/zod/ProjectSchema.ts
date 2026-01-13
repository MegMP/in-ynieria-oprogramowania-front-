import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  deadline: z.string().nonempty("Deadline is required"), 
  topicId: z.string().nonempty("Topic is required"),
  status: z.boolean(), 
});
