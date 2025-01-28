import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  name: z.string().max(150),
  description: z.string().max(256).optional(),
  creatorId: z.string().max(225),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createProjectSchema = projectSchema.omit({
  id: true,
  creatorId: true,
  created_at: true,
  updated_at: true,
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
