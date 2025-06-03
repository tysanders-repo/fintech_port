import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Hero } from "~/app/_components/hero";
import { Footer } from "~/app/_components/footer";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	// const hello = await api.post.hello({ text: "from tRPC" });
	const session = await auth();

	// if (session?.user) {
	// 	void api.post.getLatest.prefetch();
	// }

	return (
		<HydrateClient>
			<div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#fefefe] to-[#ffffff]">
				<main className="flex-1 flex flex-col items-center justify-center">
					<Hero />
				</main>
				<Footer />
			</div>
		</HydrateClient>
	);
}
