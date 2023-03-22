import * as argon2 from "argon2";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { signUpSchema } from "~/schemas/signUp";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const hash = await argon2.hash(input.password);

      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          hash: hash,
        },
      });
    }),
});
