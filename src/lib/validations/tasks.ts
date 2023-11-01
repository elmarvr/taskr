import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean(),
});

export const createTaskSchema = taskSchema.pick({
  title: true,
  description: true,
});

export const editTaskSchema = taskSchema.partial();
