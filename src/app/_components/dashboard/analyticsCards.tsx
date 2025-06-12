"use client";

import { useMemo } from "react";
import { FiDollarSign, FiBarChart, FiInfo } from "react-icons/fi";
import { PiPiggyBankFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import CountUp from "~/components/ui/countup";
import { MainGraph } from "./MainGraph";
import { DataTable } from "./DataTable";

// Animated wrappers
const MotionCard = motion(Card);
const MotionIcon = motion(FiInfo);
const hoverTapTransition = { type: 'spring', stiffness: 260, damping: 20 };

export function AnalyticCards() {
  const { data: latestBalance, isLoading: balanceLoading, error: balanceError } = api.transaction.getLatest.useQuery();
  const { data: roundUps = [], isLoading: roundupsLoading, error: roundupsError } = api.roundUp.getMultiple.useQuery();

  const balanceNumber = useMemo(
    () => (latestBalance?.balance ? Number(latestBalance.balance) : 0),
    [latestBalance]
  );
  const totalRoundups = useMemo(
    () => roundUps.reduce((sum, r) => sum + ((r.amount_cents ?? 0) / 100), 0),
    [roundUps]
  );

  if (balanceLoading || roundupsLoading) {
    return <div className="text-center py-10 text-gray-500">Loading analytics...</div>;
  }
  if (balanceError || roundupsError) {
    return <div className="text-center py-10 text-red-500">Error loading analytics. Please try again.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left: Cards & Graph */}
      <div className="space-y-8 lg:col-span-2">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              title: 'Total Balance',
              Icon: FiDollarSign,
              value: balanceNumber,
              footer: 'Your available funds for everyday spending.'
            },
            {
              title: 'Round‑Up Savings',
              Icon: PiPiggyBankFill,
              value: totalRoundups,
              footer: 'Your spare change invested automatically.'
            }
          ].map(({ title, Icon, value, footer }) => (
            <MotionCard
              key={title}
              className="container p-6 shadow-lg rounded-2xl relative"
              style={{ transformOrigin: 'center center' }}
              whileHover={{ scale: 1.03, boxShadow: '0 20px 30px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.97 }}
              transition={hoverTapTransition}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <CardHeader className="flex items-center space-x-3 pb-4">
                <Icon className="h-6 w-6 text-gray-700" />
                <CardTitle className="text-lg font-semibold text-gray-900 text-left">{title}</CardTitle>
              </CardHeader>
              <CardContent className="@container flex flex-col items-start min-h-[120px] justify-end pb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
                  className="flex items-baseline space-x-1"
                >
                  <span className="font-bold">$</span>
                  <CountUp
                    from={0}
                    to={value}
                    separator=","
                    duration={1}
                    className="text-4xl @sm:text-3xl @xl:text-5xl font-bold"
                  />
                </motion.div>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                <p className="text-sm text-gray-500 flex items-center space-x-2">
                  <MotionIcon
                    className="h-4 w-4"
                    whileHover={{ rotate: 15 }}
                    transition={hoverTapTransition}
                  />
                  <span>{footer}</span>
                </p>
              </CardFooter>
            </MotionCard>
          ))}
        </div>
        {/* Trend Graph */}
        <MotionCard
          className="shadow-lg rounded-2xl relative"
          style={{ transformOrigin: 'center center' }}
          whileHover={{ scale: 1.02, boxShadow: '0 20px 30px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.98 }}
          transition={hoverTapTransition}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <CardHeader className="flex items-center space-x-3 pb-4">
            <FiBarChart className="h-6 w-6 text-gray-700" />
            <CardTitle className="text-lg font-semibold text-gray-900 text-left">Balance & Savings Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <MainGraph />
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <p className="text-sm text-gray-500 flex items-center space-x-2">
              <MotionIcon
                className="h-4 w-4"
                whileHover={{ rotate: 15 }}
                transition={hoverTapTransition}
              />
              <span>Track progress to maximize your financial health.</span>
            </p>
          </CardFooter>
        </MotionCard>
      </div>
      {/* Right: Data Table */}
      <div className="lg:col-span-2 w-full">
        <DataTable />
      </div>
    </div>
  );
}
