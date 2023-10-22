import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean(),
});

export const createTaskSchema = taskSchema.pick({
  title: true,
});

export const editTaskSchema = taskSchema.partial();
