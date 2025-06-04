import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { NavMain } from "./navMain";
import { NavSecondary } from "./navSecondary";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
    },
    {
      title: "Lifecycle",
      url: "#",
    },
    {
      title: "Analytics",
      url: "#",
    }]
  }

export function AppSidebar() {

	return (
		<Sidebar>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      example
		</Sidebar>
	);
}
