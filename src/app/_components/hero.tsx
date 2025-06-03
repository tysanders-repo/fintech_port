import { Button } from "~/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {

  return(
    <section className="flex flex-col items-center">
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
      <span className="text-black">Be</span> <span className="text-teal-500">Grubby</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-800">
          Round up your everyday purchases and turn spare change into smart investments.
    </p>

    <div className="mt-5 flex items-center justify-center gap-4">
      <Button size="lg" className="rounded-full text-base">
        Get Started <ArrowUpRight className="!h-5 !w-5" />
      </Button>
    </div>
    </section>


  )
}