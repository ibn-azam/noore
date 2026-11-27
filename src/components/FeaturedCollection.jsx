
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShoppingBag } from "@gravity-ui/icons";

const WHATSAPP_NUMBER = "8801753071140";

async function getFeaturedPerfumes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/featuredPerfume`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch perfumes");
    }

    const result = await response.json();

    // Show only the first 4 products
    return (result.perfumes || []).slice(0, 4);
  } catch (error) {
    console.error("Error fetching featured perfumes:", error);
    return [];
  }
}

const FeaturedCollection = async () => {
  const products = await getFeaturedPerfumes();

  return (
    <section
      id="collection"
      className="scroll-mt-20 bg-[#F8F5EF] py-20 md:py-28"
    >
      <div className="container-custom">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B08D57]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
                The Noore Collection
              </span>

              <span className="h-px w-8 bg-[#B08D57]" />
            </div>

            <h2 className="font-[var(--font-heading)] text-4xl font-medium leading-tight text-[#25221F] sm:text-5xl md:text-6xl">
              Discover Your
              <span className="block italic text-[#B08D57]">
                Signature Scent.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#77716A] md:text-base">
              Explore our carefully selected fragrances, created to
              complement your personality and leave a lasting impression.
            </p>
          </div>

          <Link
            href="/collection"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#B08D57] pb-2 text-sm font-semibold text-[#25221F] transition-colors hover:text-[#B08D57]"
          >
            Explore All Fragrances

            <ArrowUpRight
              width={17}
              height={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const message = `Hello Noore! I'm interested in ordering ${product.name}. Please share more details.`;

              const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

              return (
                <article
                  key={product._id}
                  className="group flex h-full flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#EDE7DC]">
                    <Image
                      src={product.image}
                      alt={`${product.name} fragrance bottle`}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute left-4 top-4 z-10 bg-[#F8F5EF] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#8D7045]">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick Order */}
                    <Link
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Order ${product.name} on WhatsApp`}
                      className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EF] text-[#25221F] opacity-100 transition-all duration-300 hover:bg-[#B08D57] hover:text-white sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                    >
                      <ShoppingBag width={18} height={18} />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col pt-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18B6B]">
                      {product.category}
                    </p>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[var(--font-heading)] text-2xl font-medium text-[#25221F] transition-colors group-hover:text-[#B08D57]">
                        {product.name}
                      </h3>

                      <ArrowUpRight
                        width={18}
                        height={18}
                        className="mt-1 shrink-0 text-[#B08D57]"
                      />
                    </div>

                    <p className="mt-2 text-xs leading-6 text-[#77716A]">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-base font-semibold text-[#25221F]">
                        ৳{Number(product.price).toLocaleString("en-BD")}
                      </span>

                      {product.oldPrice && (
                        <span className="text-sm text-[#A49D93] line-through">
                          ৳{Number(product.oldPrice).toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>

                    {/* Order Button */}
                      <Link
                        href={orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto flex w-full items-center justify-center gap-2 border border-[#D8CBB8] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#25221F] transition-all duration-300 hover:border-[#25221F] hover:bg-[#25221F] hover:text-white"
                      >
                        Order Now
                        <ArrowRight width={15} height={15} />
                      </Link>
                    </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="font-[var(--font-heading)] text-3xl text-[#25221F]">
              No Fragrances Available
            </h3>

            <p className="mt-3 text-sm text-[#77716A]">
              Our collection is being updated. Please check back soon.
            </p>
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-16 flex flex-col items-center justify-center gap-3 border-t border-[#E8E1D6] pt-8 text-center">
          <p className="font-[var(--font-heading)] text-2xl italic text-[#77716A]">
            Find the fragrance that feels like you.
          </p>

          <span className="h-px w-12 bg-[#B08D57]" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
