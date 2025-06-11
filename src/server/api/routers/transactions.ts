import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { transactions, roundUps } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const transactionRouter = createTRPCRouter({
  pushTransactions: publicProcedure
    .input(
      z.object({
        bankAccountId: z.string().min(1),
        rows: z
          .array(
            z.object({
              amount: z.coerce.number(),
              balance: z.coerce.number(),
              description: z.string(),
        date: z.coerce.date(),
            }),
          )
          .min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId: string = ctx.session?.user.id || "dev_err";
      //delete all existing transactions where user matches
      await ctx.db.delete(roundUps).where(eq(roundUps.userId, userId));
      await ctx.db.delete(transactions).where(eq(transactions.userId, userId));

      const toInsert = input.rows.map((r) => ({
        amount: r.amount.toFixed(2),
        balance: r.balance.toFixed(2),
        description: r.description,
        bankAccountId: input.bankAccountId,
        userId: userId,
        date: r.date
      }));

      const result = await ctx.db
        .insert(transactions)
        .values(toInsert)
        .returning();

      return { success: true, result };
    }),

  getMultiple: publicProcedure.query(async ({ ctx }) => {
  const userId = ctx.session?.user?.id;
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const userTransactions = await ctx.db.query.transactions.findMany({
    where: (transaction, { eq }) => eq(transaction.userId, userId),
    orderBy: (transaction, { asc }) => asc(transaction.date),
  });

  return userTransactions;
  }),

  getLatest: publicProcedure.query( async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const latestUserBalance = await ctx.db.query.transactions.findFirst({
    where: (transaction, { eq }) => eq(transaction.userId, userId),
    orderBy: (transaction, { desc }) => desc(transaction.date),
  });

  return latestUserBalance;
    
  })
});
