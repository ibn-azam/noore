
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "@gravity-ui/icons";

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image Side */}
          <div className="relative mx-auto w-full max-w-[540px] pb-5 sm:pb-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-xl bg-[#EDE7DC]">
              <Image
              src="/dior2.jpeg"
                alt="Noore luxury perfume collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Floating Brand Label */}
            <div className="absolute bottom-0 right-2 flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-xl border border-[#E8E1D6] bg-[#F8F5EF] p-3 shadow-sm sm:-right-4 sm:p-5 lg:-right-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B08D57]/10 text-[#B08D57]">
                <Sparkles width={21} height={21} />
              </div>

              <div>
                <p className="font-[var(--font-heading)] text-xl text-[#25221F]">
                  The Noore Touch
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#77716A]">
                  Elegance in every drop
                </p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="pt-8 lg:pt-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B08D57]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
                The Story Behind Noore
              </span>
            </div>

            <h2 className="font-[var(--font-heading)] text-4xl font-medium leading-tight text-[#25221F] sm:text-5xl md:text-6xl">
              More Than a
              <span className="block italic text-[#B08D57]">
                Beautiful Fragrance.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-8 text-[#77716A] md:text-base">
              <p>
                At Noore, we believe a fragrance is more than just a scent.
                It is an expression of personality, a reflection of elegance,
                and a memory that stays long after you leave.
              </p>

              <p>
                Our collection is thoughtfully selected for those who
                appreciate beautiful aromas, timeless sophistication, and
                the little details that make every moment special.
              </p>

              <p>
                Whether you are discovering your signature scent or choosing
                a meaningful gift, Noore invites you to experience fragrance
                in a more personal way.
              </p>
            </div>

            {/* Brand Values */}
            <div className="mt-9 grid grid-cols-2 gap-6 border-y border-[#E8E1D6] py-6">
              <div>
                <h3 className="font-[var(--font-heading)] text-2xl text-[#25221F]">
                  Thoughtfully
                </h3>
                <p className="mt-1 text-xs text-[#77716A]">
                  Selected fragrances
                </p>
              </div>

              <div>
                <h3 className="font-[var(--font-heading)] text-2xl text-[#25221F]">
                  Personally
                </h3>
                <p className="mt-1 text-xs text-[#77716A]">
                  Chosen for you
                </p>
              </div>
            </div>

            <Link
              href="/#collection"
              className="group mt-8 inline-flex items-center gap-3 bg-[#25221F] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#B08D57]"
            >
              Discover Our Collection
              <ArrowUpRight
                width={17}
                height={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
