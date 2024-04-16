/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Result } from "@prisma/client";
import { z } from "zod";
Result;
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        clientName: z.string().min(1),
        result: z.nativeEnum(Result),
        startedAt: z.date(),
        endedAt: z.date(),
        price: z.string().optional(),
        product: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const milliDiff = input.endedAt.getTime() - input.startedAt.getTime();
      const totalSeconds = Math.floor(milliDiff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const dayOfWeek = input.startedAt.getDay();
      const filteredPrice = input.price?.replace(/\D/g, "");
      try {
        //  Check if client already exist
        const alredyCreated = !!(await ctx.db.client.findFirst({
          where: {
            name: input.clientName,
          },
        }));
        if (!alredyCreated) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return await ctx.db.client.create({
            data: {
              name: input.clientName,
              user: { connect: { id: ctx.session.user.id } },
            },
          });
        }

        const createPost = await ctx.db.post.create({
          data: {
            clientName: input.clientName.toUpperCase(),
            user: { connect: { id: ctx.session.user.id } },
            result: input.result,
            startedAt: input.startedAt,
            endedAt: input.endedAt,
            duration: totalMinutes,
            price: filteredPrice,
            product: input.product,
            notes: input.notes,
            // dayOfWeek: dayOfWeek
          },
        });
        return { createPost };
      } catch (e) {
        console.log(e);
      }
    }),
});
