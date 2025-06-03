import { Button } from "~/components/ui/button";
import { ArrowUpRight } from "lucide-react";


export function Footer() {
  return (
    <footer className="w-full bg-muted">
      <div className="flex justify-between items-center px-32 py-6">
        <div title="left-side-footer" className="flex gap-4">
          <span>Github</span>
          <span>Indeed</span>
        </div>
        <div title="right-side-footer">
            <Button size="lg" className="rounded-full text-base">
              Login
            </Button>
        </div>
      </div>
    </footer>
  );
}
