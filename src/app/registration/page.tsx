import { HydrateClient } from "~/trpc/server";
import Image from 'next/image'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import { OnboardingForm } from "../_components/onboardingform";

export default async function registration() {
  
  return (
    <HydrateClient>
      <main className="min-h-screen justify-center bg-gradient-to-b from-[#efefef] to-[#ffffff] text-white">
          <div className="flex flex-col">
            <div className="max-w-2xl mx-auto p-16">
              <Card>
                <CardHeader>
                  <CardTitle>Account Setup</CardTitle>

                  <CardDescription>Set up your savings account and upload your transaction history to get started.</CardDescription>
                </CardHeader>

                <CardContent>
                  <OnboardingForm />
                </CardContent>

              </Card>
              
            </div>
          </div>
      </main>
    </HydrateClient>
  )
}