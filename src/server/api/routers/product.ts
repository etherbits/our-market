import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.product.findUnique({
      where: {
        id: input,
      },
      include: {
        user: true,
        ratings: {
          include: {
            user: true,
          },
        },
      },
    });
  }),
  getFiltered: publicProcedure
    .input(z.object({ search: z.string(), amount: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        take: input.amount,
        where: {
          OR: [
            {
              title: {
                contains: input.search,
              },
            },
            {
              description: {
                contains: input.search,
              },
            },
          ],
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        user: true,
        ratings: true,
      },
    });
  }),
});
