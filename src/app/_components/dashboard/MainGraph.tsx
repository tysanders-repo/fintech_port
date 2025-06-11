"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { api } from "~/trpc/react";
import { z } from "zod"


export function MainGraph() {

  const transactions = api.transaction.getMultiple.useQuery();
  const roundUps = api.roundUp.getMultiple.useQuery();

  const chartDataSchema = z.object({
    Date: z.coerce.date(),
    Balance: z.coerce.number(),
    RoundUpTotal: z.coerce.number(),
  })

  const roundUpAmountsByTransaction = new Map<string, number>();
  if (roundUps.data) {
    for (const roundUp of roundUps.data) {
      if (roundUp?.transactionId) {
        const currentAmount = roundUpAmountsByTransaction.get(roundUp.transactionId) || 0;
        roundUpAmountsByTransaction.set(
          roundUp.transactionId,
          currentAmount + (roundUp.amount_cents ?? 0) / 100
        );
      }
    }
  }

  let cumulativeRoundUpSum = 0;

  const chartData = transactions.data
    ?.map((r) => {
      // 2. For each transaction, get its specific roundup amount (or 0 if none)
      const specificRoundUpAmount = roundUpAmountsByTransaction.get(r.id) || 0;

      // 3. Accumulate the sum based on the order of the transactions
      cumulativeRoundUpSum += specificRoundUpAmount;
      
      return chartDataSchema.parse({
        Date: r.date,
        Balance: r.balance,
        RoundUpTotal: cumulativeRoundUpSum // Use the accumulated sum here
      });
    })
    .sort((a, b) => a.Date.getTime() - b.Date.getTime()) // Crucial for cumulative sum to be correct


    const chartConfig = {
    Balance: {
      label: "Balance",
      color: "var(--chart-1)",
    },
    RoundUpTotal: {
      label: "Round Up Total",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig


  const minBalance = chartData
    ? Math.min(...chartData.map((d) => d.Balance))
    : 0
  const maxBalance = chartData
    ? Math.max(...chartData.map((d) => d.Balance))
    : 1000 // Default max if no data

  return(
    <div className="w-192">
      <ChartContainer config={chartConfig}>
              <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val) => String(val).slice(0, 10)} 
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => {
                      const date = typeof label === "string" || typeof label === "number"
                        ? new Date(label)
                        : label;
                      return isNaN(date.getTime())
                        ? String(label)
                        : date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });
                    }}
                  />
                }
              />
              <Line
                dataKey="Balance"
                type="monotone"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="RoundUpTotal"
                type="monotone"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
        </ChartContainer>
    </div>
  )
}