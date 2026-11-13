"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bars, Xmark } from "@gravity-ui/icons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href="/#home"
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

        {/* Desktop CTA */}
        <Link
          href="/#collection"
          className="btn-primary hidden items-center gap-2 md:inline-flex"
        >
          Shop Now
          <ArrowUpRight width={16} height={16} />
        </Link>

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
              href="/#collection"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-2 flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}