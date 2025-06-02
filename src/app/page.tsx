import Link from "next/link";

import { CSVUploader } from "~/app/_components/csvuploader";
import { LatestPost } from "~/app/_components/post";
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
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

        <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
        </Link>

        
			</main>
		</HydrateClient>
	);
}
