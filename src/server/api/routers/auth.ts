import { z } from "zod";
import bcrypt from "bcrypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const SALT_ROUNDS = 10;

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      if (exists) {
        throw new Error("User already exists.");
      }

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hash = bcrypt.hashSync(input.password, salt);

      const result = await ctx.db.user.create({
        data: { email: input.email, password: hash },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
  getUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.session?.user.id;
  }),
});
