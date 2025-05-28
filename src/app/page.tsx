import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";
import { CSVUploader } from "~/app/_components/csvuploader"

export default async function Home() {
	// const hello = await api.post.hello({ text: "from tRPC" });
	// const session = await auth();

	// if (session?.user) {
	// 	void api.post.getLatest.prefetch();
	// }

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
		    <CSVUploader />
			</main>
		</HydrateClient>
	);
}
