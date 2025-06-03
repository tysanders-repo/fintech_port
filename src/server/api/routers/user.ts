import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        roundUp: z.coerce.number(),
        savingsGoal: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new Error("User session not found.");
      }
      await ctx.db
        .update(users)
        .set({
          roundUp: input.roundUp.toFixed(0),
          savingsGoal: input.savingsGoal.toFixed(0),
        })
        .where(eq(users.id, ctx.session.user.id));
      return { success: true };
    }),
});