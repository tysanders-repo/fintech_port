import { HydrateClient } from "~/trpc/server";
import { SignUpLoginForm } from "../_components/signuplogin";
import { useSession } from "next-auth/react";
import { auth } from "~/server/auth";

export default async function Login() {
	const session = await auth();

	return (
		<HydrateClient>
			<main className="min-h-screen justify-center bg-gradient-to-b from-[#efefef] to-[#ffffff] text-black">
				<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
					<div className="w-full max-w-sm">
						<SignUpLoginForm newUser={!!session} />
					</div>
				</div>
			</main>
		</HydrateClient>
	);
}
