import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  label: z.string().optional(),
  priority: z.string().optional(),
});

export type Task = z.infer<typeof clientSchema>;
