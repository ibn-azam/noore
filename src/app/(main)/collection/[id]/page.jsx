
import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";

async function getPerfume(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/perfume/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.perfume || null;
  } catch (error) {
    console.error("Error fetching perfume:", error);
    return null;
  }
}

export default async function PerfumeDetailsPage({ params }) {
  const { id } = await params;
  const perfume = await getPerfume(id);

  if (!perfume) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <ShoppingBag size={40} className="text-[#B08D57]" />

        <h2 className="mt-4 font-heading text-2xl font-semibold text-[#25221F]">
          Perfume Not Found
        </h2>

        <p className="mt-2 text-sm text-[#77716A]">
          This product may have been removed or the ID is invalid.
        </p>

        <Link
          href="/collection"
          className="btn-primary mt-6 px-6 py-3"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto my-6 w-[calc(100%-2rem)] max-w-6xl space-y-6">

      {/* Header */}
      <div>
        <Link
          href="/collection"
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#77716A] transition hover:text-[#B08D57]"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        <h1 className="font-heading text-3xl font-semibold text-[#25221F]">
          Perfume Details
        </h1>

        <p className="mt-1 text-sm text-[#77716A]">
          Discover more about this fragrance.
        </p>
      </div>

      {/* Product Details */}
      <div className="grid gap-6 lg:grid-cols-5">

        {/* Product Image */}
        <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5 lg:col-span-2">
          <div className="overflow-hidden rounded-xl bg-[#F8F5EF]">
            <Image
                width={800}
                height={800}
              src={perfume.image}
              alt={perfume.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="mt-5">
            <span className="rounded-full bg-[#F8F5EF] px-3 py-1 text-xs font-semibold text-[#B08D57]">
              {perfume.category}
            </span>

            <h2 className="mt-3 font-heading text-3xl font-semibold text-[#25221F]">
              {perfume.name}
            </h2>

            <p className="mt-2 text-sm text-[#77716A]">
              SKU: {perfume.sku || "Not available"}
            </p>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6 rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-7 lg:col-span-3">

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#25221F]">
              Product Information
            </h2>

            <p className="mt-1 text-sm text-[#77716A]">
              Everything you need to know about this fragrance.
            </p>
          </div>

          {/* Price and Stock */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-[#FDFBF7] p-4">
              <p className="text-xs text-[#77716A]">
                Selling Price
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#25221F]">
                ৳ {Number(perfume.price).toLocaleString("en-BD")}
              </p>
            </div>

            <div className="rounded-xl bg-[#FDFBF7] p-4">
              <p className="text-xs text-[#77716A]">
                Previous Price
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#25221F]">
                {perfume.oldPrice
                  ? `৳ ${Number(perfume.oldPrice).toLocaleString("en-BD")}`
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FDFBF7] p-4">
              <p className="text-xs text-[#77716A]">
                Availability
              </p>

              <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-[#25221F]">
                <Package size={19} className="text-[#B08D57]" />

                {Number(perfume.stock) > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FDFBF7] p-4">
              <p className="text-xs text-[#77716A]">
                Product Status
              </p>

              <p className="mt-2 text-lg font-semibold text-[#25221F]">
                {perfume.status || "Active"}
              </p>
            </div>

          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-[#25221F]">
              Description
            </h3>

            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#77716A]">
              {perfume.description}
            </p>
          </div>

          {/* Product ID */}
          <div className="border-t border-[#E8E1D6] pt-4">
            <p className="text-xs text-[#A49D93]">
              Product ID: {perfume._id.toString()}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
