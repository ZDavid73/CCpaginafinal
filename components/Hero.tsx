import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-secondary">
       <Image
          src="https://picsum.photos/seed/hero/1800/1200"
          alt="Trading cards spread out on a table"
          data-ai-hint="trading cards"
          fill
          className="object-cover"
          priority
        />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Unleash Your Collection
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
            The ultimate destination for TCG enthusiasts. Find rare cards, booster boxes, and accessories for your favorite games.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="gold">
              <Link href="/category/one-piece">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
