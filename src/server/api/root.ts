import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { productRouter } from "./routers/product";
import { ratingRouter } from "./routers/rating";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  rating: ratingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
