/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const clientRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.client.findMany();
  }),

  // POST
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), email: z.string().min(3) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.client.create({
        data: {
          name: input.name,
          email: input.email,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(3),
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.client.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(3),
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.client.delete({
        where: { id: input.id },
      });
    }),
});
