import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { bankAccounts } from "~/server/db/schema";

export const bankRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        bankName: z.string().min(2),
        userId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const inserted = await ctx.db.insert(bankAccounts)
                  .values({
                    name: input.bankName,
                    userId: input.userId
                  })
                  .returning();
      return { success: true, bankId: inserted[0]?.id };
    }),

    getBankId: publicProcedure
      .input(z.object({ name: z.string().min(2) }))
      .query(async ({ctx, input}) => {
        const bankInfo = await ctx.db.query.bankAccounts.findFirst({
          where: (bank, { eq }) => eq(bank.name, input.name),
        });
        return bankInfo?.id ?? null;
      })

})