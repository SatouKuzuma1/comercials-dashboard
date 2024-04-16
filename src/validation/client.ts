import z from "zod";

export const createClientSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4),
});

export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
