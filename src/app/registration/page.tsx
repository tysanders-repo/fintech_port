import { HydrateClient } from "~/trpc/server";
import Image from 'next/image'

import { OnboardingForm } from "../_components/onboardingform";

export default async function registration() {
  
  return (
    <HydrateClient>
      <main className="min-h-screen justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="w-full max-w-xs">
              <OnboardingForm />
            </div>
          </div>

          <div className="bg-muted relative hidden lg:block">
            <img
              src="/placeholder.svg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </main>
    </HydrateClient>
  )
}