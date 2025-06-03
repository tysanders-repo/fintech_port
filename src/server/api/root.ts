import { transactionRouter } from "~/server/api/routers/transactions";
import {bankRouter } from "~/server/api/routers/bank"
import { userRouter } from "./routers/user";
import { roundUpRouter } from "./routers/roundups";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	transaction: transactionRouter,
  bank: bankRouter,
  user: userRouter,
  roundUp: roundUpRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
