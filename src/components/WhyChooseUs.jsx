
import {
  Gem,
  Heart,
  Comment,
  Gift,
} from "@gravity-ui/icons";

const features = [
  {
    id: 1,
    icon: Gem,
    title: "Thoughtfully Selected",
    description:
      "Explore a carefully selected collection of fragrances for different tastes and occasions.",
  },
  {
    id: 2,
    icon: Heart,
    title: "A Personal Experience",
    description:
      "Find a fragrance that reflects your personality and makes every moment feel special.",
  },
  {
    id: 3,
    icon: Comment,
    title: "Easy Ordering",
    description:
      "Connect with us directly to ask questions and place your fragrance order through WhatsApp.",
  },
  {
    id: 4,
    icon: Gift,
    title: "Perfect for Gifting",
    description:
      "Discover fragrance options for birthdays, celebrations, and thoughtful everyday gifts.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#F8F5EF] py-20 md:py-28">
      <div className="container-custom">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B08D57]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
              The Noore Difference
            </span>
            <span className="h-px w-8 bg-[#B08D57]" />
          </div>

          <h2 className="font-[var(--font-heading)] text-4xl font-medium leading-tight text-[#25221F] sm:text-5xl md:text-6xl">
            Why Choose
            <span className="italic text-[#B08D57]"> Noore?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77716A] md:text-base">
            We want finding your next favourite fragrance to feel as special
            as wearing it.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group border border-[#E8E1D6] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_15px_40px_rgba(37,34,31,0.05)] md:p-8"
              >
                {/* Icon */}
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F5EF] text-[#B08D57] transition-colors duration-300 group-hover:bg-[#B08D57] group-hover:text-white">
                  <Icon width={23} height={23} />
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-heading)] text-2xl font-medium text-[#25221F]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77716A]">
                  {feature.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-8 h-px w-10 bg-[#B08D57] transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-14 text-center">
          <p className="font-[var(--font-heading)] text-2xl italic text-[#77716A] md:text-3xl">
            Your fragrance. Your identity. Your Noore.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
