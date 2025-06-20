import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { AppSidebar } from "../_components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Footer } from "~/app/_components/footer";

export const metadata: Metadata = {
	title: "Grubby",
	description: "A portfolio piece to help you track your spending",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function Layout({ children }: { children: React.ReactNode }) {
return (
		<html lang="en" className={`${geist.variable}`}>
			<body className="overflow-hidden">
				<SessionProvider>
					<TRPCReactProvider>
           <SidebarProvider>
             <div className="flex h-screen w-screen">
               <AppSidebar />
               <main className="flex-1 flex flex-col overflow-y-auto">
                 <SidebarTrigger />
                 <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
                   {children}
                 </div>
                 <Footer />
               </main>
             </div>
           </SidebarProvider>
			</TRPCReactProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
