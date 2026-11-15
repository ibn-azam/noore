"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, ShoppingBag, Xmark } from "@gravity-ui/icons";
import { useCart } from "@/components/CartProvider";

const WHATSAPP_NUMBER = "8801753071140";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkoutMessage = `Hello Noore! I'd like to order:\n\n${items
    .map(
      (item) =>
        `${item.name} x ${item.quantity} — ৳${(item.price * item.quantity).toLocaleString("en-BD")}`
    )
    .join("\n")}\n\nTotal: ৳${total.toLocaleString("en-BD")}\nPlease share the next steps.`;
  const checkoutUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(checkoutMessage)}`;

  return (
    <section className="min-h-[60vh] bg-[#F8F5EF] px-5 py-14 md:py-20">
      <div className="container-custom">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
            Your Selection
          </p>
          <h1 className="mt-3 font-[var(--font-heading)] text-4xl font-medium text-[#25221F] sm:text-5xl">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="border border-[#E8E1D6] bg-white px-6 py-16 text-center">
            <ShoppingBag
              width={32}
              height={32}
              className="mx-auto text-[#B08D57]"
            />
            <h2 className="mt-5 font-[var(--font-heading)] text-2xl text-[#25221F]">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-[#77716A]">
              Explore the collection and add a fragrance you love.
            </p>
            <Link
              href="/collection"
              className="mt-6 inline-flex bg-[#25221F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B08D57]"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 border border-[#E8E1D6] bg-white p-4 sm:gap-6 sm:p-5"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded bg-[#EDE7DC] sm:h-36 sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18B6B]">
                        {item.category}
                      </p>
                      <h2 className="mt-1 font-[var(--font-heading)] text-xl text-[#25221F]">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-[#25221F]">
                        ৳{item.price.toLocaleString("en-BD")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex items-center border border-[#E8E1D6]">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#77716A] hover:text-[#25221F]"
                        >
                          <Minus width={14} height={14} />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#77716A] hover:text-[#25221F]"
                        >
                          <Plus width={14} height={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#77716A] transition-colors hover:text-red-700"
                      >
                        <Xmark width={18} height={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-[#E8E1D6] bg-white p-6">
              <h2 className="font-[var(--font-heading)] text-2xl text-[#25221F]">
                Order Summary
              </h2>
              <div className="mt-5 flex justify-between border-t border-[#E8E1D6] pt-5 text-sm">
                <span className="text-[#77716A]">Subtotal</span>
                <span className="font-semibold text-[#25221F]">
                  ৳{total.toLocaleString("en-BD")}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#77716A]">
                Delivery charges, if any, will be confirmed on WhatsApp.
              </p>
              <Link
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-[#25221F] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B08D57]"
              >
                Continue on WhatsApp
                <ArrowUpRight width={15} height={15} />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
