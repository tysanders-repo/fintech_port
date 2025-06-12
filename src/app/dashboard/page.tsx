import { HydrateClient, api } from "~/trpc/server";
import { AnalyticCards } from "../_components/dashboard/analyticsCards";

export default async function Home() {
	return (
		<HydrateClient>
			<div className="flex flex-col flex-1 bg-gradient-to-b from-[#fefefe] to-[#ffffff] p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-screen-2xl mx-auto">
          <AnalyticCards />
        </div>
			</div>
		</HydrateClient>
	);
}