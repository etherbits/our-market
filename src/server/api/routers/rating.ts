import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ratingRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(z.object({ id: z.string(), amount: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.rating.findMany({
        take: input.amount,
        where: {
          productId: input.id,
          
        },
        include: {
          user: true
        }
      });
    }),
});
