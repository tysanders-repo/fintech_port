import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { transactions } from "~/server/db/schema";

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
						}),
					)
					.min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId: string = ctx.session?.user.id || "dev_err";

			const toInsert = input.rows.map((r) => ({
				amount: r.amount.toFixed(2),
				balance: r.balance.toFixed(2),
				description: r.description,
				bankAccountId: input.bankAccountId,
				userId: userId,
			}));

			const result = await ctx.db.insert(transactions).values(toInsert).returning();

      return {success: true, result};
		}),
});
