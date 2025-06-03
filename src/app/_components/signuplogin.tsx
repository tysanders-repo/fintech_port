"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import { DiscordIcon, AppleIcon, GoogleIcon } from "~/app/_components/icons";
import Discord from "next-auth/providers/discord";

interface LoginFormProps {
	newUser: boolean;
}

export function SignUpLoginForm({ newUser }: LoginFormProps) {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col items-center text-center">
				<h1 className="text-xl font-bold">
					<span className="text-black">
						Welcome {newUser ? "to" : "back to"}
					</span>{" "}
					<span className="text-teal-500">Grubby</span>
				</h1>
				<p className="text-muted-foreground text-sm">
					Choose your perfered method to sign {newUser ? "up" : "in"}
				</p>
			</div>

			<span className="bg-muted block h-px w-full"></span>

			<div className="flex flex-col gap-4 w-full">
				<Button
					variant="outline"
					type="button"
					className="w-full"
					onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
				>
					<DiscordIcon />
					Continue with Discord
				</Button>

				<Button
					variant="outline"
					type="button"
					className="w-full"
					onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
				>
					<GoogleIcon />
					Continue with Google
				</Button>

				<Button
					variant="outline"
					type="button"
					className="w-full"
					onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
				>
					<AppleIcon />
					Continue with Apple
				</Button>
			</div>
		</div>
	);
}
