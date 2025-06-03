import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { roundUps } from "~/server/db/schema";

export const roundUpRouter = createTRPCRouter({
	createMultiple: publicProcedure
		.input(
			z.object({
				bankAccountId: z.string().min(1),
				rows: z
					.array(
						z.object({
							amount: z.coerce.number(),
							transactionId: z.string().min(2),
						}),
					)
					.min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const userId: string = ctx.session?.user.id || "dev_err";

			const toInsert = input.rows.map((r) => ({
				amount_cents: Math.round(r.amount * 100),
				userId: userId,
				transactionId: r.transactionId,
			}));

			const result = await ctx.db.insert(roundUps).values(toInsert);

			return { success: true };
		}),
});
