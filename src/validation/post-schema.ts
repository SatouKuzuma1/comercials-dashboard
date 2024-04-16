import z from "zod";
import { Result } from "@prisma/client";
export const inputSchema = z.object({
  clientName: z.string().min(1),
  result: z.nativeEnum(Result).optional(),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
  price: z.string().optional(),
  product: z.string().optional(),
  notes: z.string().optional(),
});

export type InputSchemaType = z.infer<typeof inputSchema>;
// export type IRegister = z.infer<typeof registerSchema>;
