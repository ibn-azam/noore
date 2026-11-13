
import { QuoteOpen, StarFill } from "@gravity-ui/icons";

const testimonials = [
  {
    id: 1,
    name: "Mubin Ahmed",
    location: "Sylhet",
    initials: "AR",
    rating: 5,
    product: "Dior Sauvage",
    review:
      "Absolutely loved the fragrance! It feels elegant and unique. The overall experience was lovely, and I'm looking forward to trying more scents from Noore.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    location: "Sylhet",
    initials: "NJ",
    rating: 5,
    product: "Velvet Bloom",
    review:
      "The fragrance has such a beautiful character. I really enjoyed exploring the collection and the ordering experience was simple and convenient.",
  },
  {
    id: 3,
    name: "Mahfuj Ahmed",
    location: "Sylhet",
    initials: "SA",
    rating: 5,
    product: "Vampire Blood",
    review:
      "A lovely fragrance choice! I appreciate the attention to presentation and the overall experience. Definitely worth exploring the collection.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-white py-20 md:py-28"
    >
      <div className="container-custom">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B08D57]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
              Words From Our Customers
            </span>
            <span className="h-px w-8 bg-[#B08D57]" />
          </div>

          <h2 className="font-[var(--font-heading)] text-4xl font-medium leading-tight text-[#25221F] sm:text-5xl md:text-6xl">
            Loved for Every
            <span className="block italic text-[#B08D57]">
              Little Detail.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77716A] md:text-base">
            Every fragrance tells a story. Discover what customers have
            to say about their experience with Noore.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group relative flex flex-col border border-[#E8E1D6] bg-[#F8F5EF] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_15px_40px_rgba(37,34,31,0.05)] md:p-9"
            >
              {/* Quote Icon */}
              <div className="absolute right-7 top-7 text-[#B08D57]/20 transition-colors group-hover:text-[#B08D57]/40">
                <QuoteOpen width={42} height={42} />
              </div>

              {/* Rating */}
              <div className="mb-7 flex gap-1">
                {Array.from({ length: testimonial.rating }).map(
                  (_, index) => (
                    <StarFill
                      key={index}
                      width={15}
                      height={15}
                      className="text-[#B08D57]"
                    />
                  )
                )}
              </div>

              {/* Review */}
              <p className="flex-1 font-[var(--font-heading)] text-xl leading-8 text-[#37312B] md:text-2xl">
                &ldquo;{testimonial.review}&rdquo;
              </p>

              {/* Product */}
              <div className="mt-7 inline-flex w-fit border border-[#E8E1D6] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A18B6B]">
                Purchased: {testimonial.product}
              </div>

              {/* Customer Details */}
              <div className="mt-8 flex items-center gap-4 border-t border-[#E8E1D6] pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25221F] font-[var(--font-heading)] text-lg text-[#D9BE91]">
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#25221F]">
                    {testimonial.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#77716A]">
                    {testimonial.location}, Bangladesh
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 border-t border-[#E8E1D6] pt-8 text-center">
          <p className="font-[var(--font-heading)] text-2xl italic text-[#77716A] md:text-3xl">
            Your experience could be our next beautiful story.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
