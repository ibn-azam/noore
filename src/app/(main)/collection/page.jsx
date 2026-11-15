
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Magnifier,
  Sliders,
  ShoppingBag,
  ArrowUpRight,
  Xmark,
} from "@gravity-ui/icons";
import { useCart } from "@/components/CartProvider";

const WHATSAPP_NUMBER = "8801753071140";

const products = [
  {
    id: 1,
    name: "Oud Royale",
    category: "Woody & Oriental",
    price: 1850,
    oldPrice: 2200,
    image: "/dior2.jpeg",
    badge: "Bestseller",
    description: "A rich, captivating fragrance with a warm oud finish.",
  },
  {
    id: 2,
    name: "Velvet Bloom",
    category: "Floral",
    price: 1550,
    oldPrice: null,
    image: "/blood.jpeg",
    badge: "Popular",
    description: "A delicate floral fragrance with a graceful character.",
  },
  {
    id: 3,
    name: "Midnight Musk",
    category: "Fresh & Musky",
    price: 1750,
    oldPrice: null,
    image: "/WhatsApp%20Image%202026-11-14%20at%201.00.59%20AM%20(1).jpeg",
    badge: null,
    description: "A smooth, modern scent for unforgettable evenings.",
  },
  {
    id: 4,
    name: "Amber Essence",
    category: "Warm & Spicy",
    price: 1950,
    oldPrice: 2300,
    image: "/dior.jpeg",
    badge: "Limited Offer",
    description: "An inviting blend of amber and warm aromatic notes.",
  },
];

const CollectionsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cartMessage, setCartMessage] = useState("");
  const { addToCart, cartCount } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`${product.name} added to cart.`);
  };

  // Get categories automatically from product data
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search, filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search by product name
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort by price
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
        {/* Page Header */}
        <section className="border-b border-[#E8E1D6] px-5 pb-14 pt-20 text-center md:pb-20 md:pt-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#B08D57]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
                Discover Noore
              </span>
              <span className="h-px w-8 bg-[#B08D57]" />
            </div>

            <h1 className="font-[var(--font-heading)] text-5xl font-medium leading-tight text-[#25221F] sm:text-6xl md:text-7xl">
              Our Fragrance
              <span className="block italic text-[#B08D57]">
                Collection.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#77716A] md:text-base">
              Explore our collection of carefully selected fragrances.
              Find a scent that reflects your personality and makes
              every moment unforgettable.
            </p>
          </div>
        </section>

        {/* Collection Content */}
        <section className="container-custom py-14 md:py-20">

          {/* Search and Sorting */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Magnifier
                width={19}
                height={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A49D93]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your favourite fragrance..."
                className="w-full border border-[#E8E1D6] bg-white py-4 pl-12 pr-12 text-sm text-[#25221F] outline-none transition-colors placeholder:text-[#A49D93] focus:border-[#B08D57]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77716A] hover:text-[#25221F]"
                >
                  <Xmark width={17} height={17} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <Sliders
                width={18}
                height={18}
                className="shrink-0 text-[#B08D57]"
              />

              <span className="whitespace-nowrap text-xs font-semibold text-[#77716A]">
                Sort by:
              </span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full border border-[#E8E1D6] bg-white px-4 py-3.5 text-sm text-[#25221F] outline-none focus:border-[#B08D57] sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`border px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "border-[#25221F] bg-[#25221F] text-white"
                    : "border-[#E8E1D6] bg-white text-[#77716A] hover:border-[#B08D57] hover:text-[#B08D57]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-7 flex items-center justify-between border-b border-[#E8E1D6] pb-5">
            <p className="text-sm text-[#77716A]">
              Showing{" "}
              <span className="font-semibold text-[#25221F]">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "fragrance" : "fragrances"}
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSortBy("featured");
                }}
                className="text-xs font-semibold text-[#B08D57] hover:text-[#25221F]"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#25221F]" aria-live="polite">
              Cart: {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
            <p className="text-sm text-[#77716A]" role="status" aria-live="polite">
              {cartMessage}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const message = `Hello Noore! I'm interested in ordering:

Product: ${product.name}
Price: ৳${product.price.toLocaleString("en-BD")}

Please share more details.`;

                const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

                return (
                  <article key={product.id} className="group">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#EDE7DC]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Product Badge */}
                      {product.badge && (
                        <span className="absolute left-4 top-4 z-10 bg-[#F8F5EF] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#8D7045]">
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EF] text-[#25221F] transition-all hover:bg-[#B08D57] hover:text-white sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                      >
                        <ShoppingBag width={18} height={18} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="pt-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18B6B]">
                        {product.category}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-[var(--font-heading)] text-2xl font-medium text-[#25221F] transition-colors group-hover:text-[#B08D57]">
                          {product.name}
                        </h2>

                        <ArrowUpRight
                          width={18}
                          height={18}
                          className="shrink-0 text-[#B08D57]"
                        />
                      </div>

                      <p className="mt-2 min-h-12 text-xs leading-6 text-[#77716A]">
                        {product.description}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-base font-semibold text-[#25221F]">
                          ৳{product.price.toLocaleString("en-BD")}
                        </span>

                        {product.oldPrice && (
                          <span className="text-sm text-[#A49D93] line-through">
                            ৳{product.oldPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center justify-center gap-2 border border-[#D8CBB8] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#25221F] transition-all duration-300 hover:border-[#B08D57] hover:text-[#8D7045]"
                        >
                          <ShoppingBag width={15} height={15} />
                          Add to Cart
                        </button>
                        <Link
                          href={orderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-[#25221F] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B08D57]"
                        >
                          Buy Now
                          <ArrowUpRight width={15} height={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#B08D57]">
                <Magnifier width={25} height={25} />
              </div>

              <h3 className="font-[var(--font-heading)] text-3xl text-[#25221F]">
                No Fragrances Found
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-[#77716A]">
                We couldn&apos;t find a perfume matching your search.
                Try another name or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSortBy("featured");
                }}
                className="mt-7 bg-[#25221F] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B08D57]"
              >
                View All Fragrances
              </button>
            </div>
          )}
        </section>
    </div>
  );
};

export default CollectionsPage;
