import { HydrateClient, api } from "~/trpc/server";
import { AnalyticCards } from "../_components/dashboard/analyticsCards";

export default async function Home() {
	return (
		<HydrateClient>
			<div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-[#fefefe] to-[#ffffff]">
						<AnalyticCards />
			</div>
		</HydrateClient>
	);
}
