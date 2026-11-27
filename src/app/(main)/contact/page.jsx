
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight, 
  Comment,
  Envelope,
  LogoFacebook,
  Sparkles,
} from "@gravity-ui/icons";

const WHATSAPP_NUMBER = "8801753071140";

const products = [
  "Oud Royale",
  "Velvet Bloom",
  "Midnight Musk",
  "Amber Essence",
  "I'm not sure yet",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [product, setProduct] = useState(products[0]);
  const [message, setMessage] = useState(
    "Hello Noore! I'd love to know more about your fragrances."
  );

  const handleWhatsAppOrder = (event) => {
    event.preventDefault();

    const orderMessage = `
Hello Noore!

My name: ${name || "Not provided"}
Interested in: ${product}

Message:
${message}

Please share more details. Thank you!
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      orderMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const quickMessage =
    "Hello Noore! I'd like to know more about your perfume collection.";

  const quickWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    quickMessage
  )}`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F8F5EF] py-5 md:py-10"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#B08D57]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#B08D57]/5 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B08D57]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
              We&apos;d Love to Hear From You
            </span>
            <span className="h-px w-8 bg-[#B08D57]" />
          </div>

          <h2 className="font-[var(--font-heading)] text-4xl font-medium leading-tight text-[#25221F] sm:text-5xl md:text-6xl">
            Let&apos;as Find Your
            <span className="block italic text-[#B08D57]">
              Perfect Fragrance.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77716A] md:text-base">
            Have a question or found a fragrance you love? Get in touch
            with Noore. We&apos;re here to help you choose your next signature scent.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white shadow-[0_20px_60px_rgba(37,34,31,0.04)] lg:grid-cols-[0.85fr_1.15fr]">

          {/* Left Side */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#25221F] p-8 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-[#B08D57]/20" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-[#B08D57]/20" />

            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#B08D57]/40 bg-[#B08D57]/10 text-[#D9BE91]">
                <Sparkles width={25} height={25} />
              </div>

              <h3 className="font-[var(--font-heading)] text-3xl leading-tight sm:text-4xl">
                A Beautiful
                <span className="block italic text-[#D9BE91]">
                  Scent Starts Here.
                </span>
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                Tell us what you&apos;re looking for. Whether it&apos;s a personal
                fragrance or a thoughtful gift, we&apos;d love to help.
              </p>

              {/* WhatsApp Contact */}
              <div className="mt-10 border-t border-white/10 pt-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B08D57]/15 text-[#D9BE91]">
                    <Comment width={20} height={20} />
                  </div>

                  <div>
                    <p className="text-xs text-white/50">
                      Order directly through
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      WhatsApp
                    </p>
                  </div>
                </div>

                <Link
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#B08D57] px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#987546]"
                >
                  <Comment width={17} height={17} />
                  Chat With Noore
                  <ArrowUpRight width={16} height={16} />
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative z-10 mt-14 border-t border-white/10 pt-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Follow Our Journey
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href="https://www.facebook.com/share/14zmYNNwfBE/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Noore on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#B08D57] hover:bg-[#B08D57] hover:text-white"
                >
                  <LogoFacebook width={17} height={17} />
                </Link>

                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Noore on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#B08D57] hover:bg-[#B08D57] hover:text-white"
                >
                  <Envelope width={17} height={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: WhatsApp Form */}
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                Place an Enquiry
              </span>

              <h3 className="mt-3 font-[var(--font-heading)] text-3xl font-medium text-[#25221F] sm:text-4xl">
                How Can We Help?
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#77716A]">
                Fill in the details below and continue your conversation
                with us on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleWhatsAppOrder} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-xs font-semibold text-[#37312B]"
                >
                  Your Name
                </label>

                <input
                  id="customer-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-[#E8E1D6] bg-[#F8F5EF]/50 px-4 py-3.5 text-sm text-[#25221F] outline-none transition-all placeholder:text-[#A49D93] focus:border-[#B08D57] focus:bg-white"
                />
              </div>

              {/* Product */}
              <div>
                <label
                  htmlFor="product"
                  className="mb-2 block text-xs font-semibold text-[#37312B]"
                >
                  Interested In
                </label>

                <select
                  id="product"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  className="w-full appearance-none border border-[#E8E1D6] bg-[#F8F5EF]/50 px-4 py-3.5 text-sm text-[#25221F] outline-none transition-all focus:border-[#B08D57] focus:bg-white"
                >
                  {products.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold text-[#37312B]"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what fragrance you're looking for..."
                  className="w-full resize-none border border-[#E8E1D6] bg-[#F8F5EF]/50 px-4 py-3.5 text-sm leading-7 text-[#25221F] outline-none transition-all placeholder:text-[#A49D93] focus:border-[#B08D57] focus:bg-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 bg-[#25221F] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#B08D57]"
              >
                Send Enquiry on WhatsApp
                <ArrowRight
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <p className="text-center text-[11px] leading-5 text-[#999188]">
                You&apos;ll be redirected to WhatsApp to send your enquiry.
                No payment is collected through this form.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="font-[var(--font-heading)] text-2xl italic text-[#77716A] md:text-3xl">
            We&apos;re just a message away.
          </p>
        </div>
      </div>
    </section>
  );
}
