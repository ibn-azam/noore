"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars, ShoppingCart, Xmark } from "@gravity-ui/icons";
import { useCart } from "@/components/CartProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-4xl font-semibold tracking-wide"
          onClick={() => setIsOpen(false)}
        >
          Noore<span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-primary/75 transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-3 py-2 text-sm font-medium text-primary/75 transition-colors hover:text-accent"
          >
            Login
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2">
            Register
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <ShoppingCart width={19} height={19} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
        >
          {isOpen ? (
            <Xmark width={22} height={22} />
          ) : (
            <Bars width={22} height={22} />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="container-custom flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-primary/80 transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-primary/80 transition-colors hover:text-accent"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="btn-primary flex items-center justify-center"
            >
              Register
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              aria-label={`Cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              className="flex items-center gap-3 text-base font-medium text-primary/80 transition-colors hover:text-accent"
            >
              <ShoppingCart width={19} height={19} />
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}