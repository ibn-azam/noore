"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, TrashBin } from "@gravity-ui/icons";
import { useCart } from "@/components/CartProvider";
import { toast } from "sonner";

const initialWishlist = [
  {
    id: "1",
    name: "Oud Royale",
    category: "Woody & Oriental",
    price: 4500,
    oldPrice: 5200,
    image: "https://i.ibb.co.com/your-image.jpg",
  },
  {
    id: "2",
    name: "Velvet Rose",
    category: "Floral",
    price: 3200,
    oldPrice: 3800,
    image: "https://i.ibb.co.com/your-image.jpg",
  },
  {
    id: "3",
    name: "Amber Essence",
    category: "Warm & Spicy",
    price: 2800,
    oldPrice: null,
    image: "https://i.ibb.co.com/your-image.jpg",
  },
  {
    id: "4",
    name: "Royal Musk",
    category: "Fresh & Musky",
    price: 5500,
    oldPrice: 6000,
    image: "https://i.ibb.co.com/your-image.jpg",
  },
];

function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const { addToCart } = useCart();

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product removed from wishlist.");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
          My Account
        </p>

        <h1 className="mt-2 font-heading text-3xl font-semibold text-[#25221F] sm:text-4xl">
          My Wishlist
        </h1>

        <p className="mt-2 text-sm text-[#77716A]">
          Your favourite fragrances, all in one place.
        </p>
      </div>

      {/* Wishlist Summary */}
      <div className="flex items-center justify-between rounded-2xl border border-[#E8E1D6] bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#B08D57]">
            <Heart width={23} height={23} />
          </div>

          <div>
            <h2 className="font-semibold text-[#25221F]">Saved Products</h2>
            <p className="mt-1 text-sm text-[#77716A]">
              {wishlist.length} {wishlist.length === 1 ? "product" : "products"}{" "}
              saved
            </p>
          </div>
        </div>

        <span className="font-heading text-3xl font-semibold text-[#B08D57]">
          {wishlist.length.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Wishlist Products */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F5EF]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                >
                  <Heart width={19} height={19} />
                </button>
              </div>

              {/* Product Information */}
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[#B08D57]">
                  {product.category}
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold text-[#25221F]">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-lg font-semibold text-[#25221F]">
                    ৳{product.price.toLocaleString("en-BD")}
                  </span>

                  {product.oldPrice && (
                    <span className="text-sm text-[#99918A] line-through">
                      ৳{product.oldPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm"
                  >
                    <ShoppingBag width={17} height={17} />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    aria-label={`Delete ${product.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8E1D6] text-[#77716A] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <TrashBin width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Wishlist */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E8E1D6] bg-white px-5 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F5EF] text-[#B08D57]">
            <Heart width={32} height={32} />
          </div>

          <h2 className="mt-6 font-heading text-2xl font-semibold text-[#25221F]">
            Your wishlist is empty
          </h2>

          <p className="mt-2 max-w-sm text-sm text-[#77716A]">
            Save your favourite fragrances here and come back whenever
            you&apos;re ready.
          </p>

          <Link href="/collection" className="btn-primary mt-6 px-6 py-3">
            Explore Collection
          </Link>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
