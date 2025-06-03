"use client";

import Image from "next/image";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { useState } from "react";
import { OnboardingForm } from "../_components/onboardingform";

type Step = "signup" | "onboarding" | "complete";

export default function Registration() {
	return (
		<main className="min-h-screen justify-center bg-gradient-to-b from-[#efefef] to-[#ffffff] text-white">
			<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
				<div className="w-full max-w-sm text-black">
					<OnboardingForm />
				</div>
			</div>
		</main>
	);
}
