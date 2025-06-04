import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { roundUps } from "~/server/db/schema";

export const roundUpRouter = createTRPCRouter({
	createMultiple: publicProcedure
		.input(
			z.object({
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
			if (!ctx.session?.user?.id) {
				throw new Error("Not authenticated");
			}
			const userId = ctx.session.user.id;

			const toInsert = input.rows.map((r) => ({
				userId: userId,
				transactionId: r.transactionId,
				amount_cents: Math.round(r.amount * 100),
			}));

			const result = await ctx.db.insert(roundUps).values(toInsert);

			return {
				insertedCount: Array.isArray(toInsert) ? toInsert.length : 0,
			};
		}),

    getMultiple: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userRoundUps = await ctx.db.query.roundUps.findMany({
        where: (roundUp, { eq }) => eq(roundUp.userId, userId),
      });

      return userRoundUps;
    }),
});
