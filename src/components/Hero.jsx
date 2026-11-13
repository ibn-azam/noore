
import { ArrowRight, Sparkles } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden bg-background">
      <div className="container-custom">
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16 xl:gap-20">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0">
            <div className="mb-5 flex items-center gap-3 sm:mb-7">
              <span className="h-px w-8 bg-accent sm:w-10" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs sm:tracking-[0.3em]">
                The Art of Fragrance
              </span>
            </div>

            <h1 className="font-heading text-[clamp(3.25rem,10vw,5rem)] leading-[0.98] tracking-tight text-primary sm:text-6xl sm:leading-[1.02] md:text-7xl lg:text-[clamp(4rem,5.5vw,5.75rem)] xl:text-8xl">
              A Scent That
              <br />
              <span className="font-normal italic text-accent">
                Defines You.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-secondary sm:mt-7 sm:text-base sm:leading-8">
              Discover the beauty of exceptional fragrances.
              Find a scent that reflects your personality,
              creates memories, and leaves a lasting impression.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/#collection"
                className="btn-primary group w-full gap-3 sm:w-auto"
              >
                Explore Collection
                <ArrowRight
                  width={17}
                  height={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link href="/about#about" className="btn-outline w-full sm:w-auto">
                Discover Noore
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-border pt-5 sm:mt-14 sm:gap-4 sm:pt-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white sm:h-11 sm:w-11">
                <Sparkles width={19} height={19} className="text-accent" />
              </div>

              <div>
                <p className="font-heading text-lg font-semibold text-primary sm:text-xl">
                  Find Your Signature
                </p>
                <p className="mt-1 text-xs text-secondary">
                  Every fragrance tells a story.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] px-2 pb-5 sm:px-5 sm:pb-7 lg:px-0 lg:pb-0">
            <div className="absolute -right-2 top-4 h-32 w-32 rounded-full bg-[#E9DDCA]/60 blur-3xl sm:-right-3 sm:-top-5 sm:h-40 sm:w-40" />
            <div className="absolute -bottom-2 -left-2 h-36 w-36 rounded-full bg-[#D8C3A5]/30 blur-3xl sm:-bottom-5 sm:-left-5 sm:h-48 sm:w-48" />

            <div className="relative aspect-[0.92] overflow-hidden rounded-t-[48%] rounded-b-[34%] bg-[#E9E0D3] sm:aspect-[4/5]">
              <Image
                src="/dior.jpeg"
                alt="Elegant Noore perfume bottle"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-4 right-4 rounded-xl border border-border/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:bottom-5 sm:left-0 sm:right-auto sm:p-5 lg:-left-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[10px] sm:tracking-[0.25em]">
                Discover Noore
              </p>
              <p className="mt-1 font-heading text-xl font-semibold text-primary sm:mt-2 sm:text-2xl">
                Your Signature Scent
              </p>
              <p className="mt-1 text-xs text-secondary">
                Elegance in every drop.
              </p>
            </div>

            <div className="absolute right-0 top-1/4 hidden [writing-mode:vertical-rl] lg:block">
              <span className="text-xs uppercase tracking-[0.35em] text-secondary">
                NOORE — FRAGRANCE COLLECTION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
