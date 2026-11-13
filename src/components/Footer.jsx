import Link from "next/link";
import {
  ArrowUpRight,
  ArrowUp,
  Camera,
  LogoFacebook,
} from "@gravity-ui/icons";

const footerLinks = [
  { name: "Home", href: "/#home" },
  { name: "Collection", href: "/#collection" },
  { name: "About Us", href: "/about#about" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-primary text-white">

      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Information */}
          <div className="lg:col-span-2">
            <Link
              href="/#home"
              className="inline-block font-heading text-5xl font-semibold tracking-wide"
            >
              Noore<span className="text-accent">.</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Discover the beauty of fragrance with Noore.
              Explore carefully selected scents that express
              your personality and leave a lasting impression.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/14zmYNNwfBE/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-accent hover:bg-accent"
              >
                <LogoFacebook width={17} height={17} />
              </a>

              <a
                href="#contact"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-accent hover:bg-accent"
              >
                <Camera width={17} height={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-2xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-2xl font-semibold">
              Get In Touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/60">
              Have a question or looking for your
              signature fragrance? We&apos;d love to hear from you.
            </p>

            <Link
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
            >
              Contact Us
              <ArrowUpRight width={16} height={16} />
            </Link>
          </div>

        </div>

        {/* Decorative Divider */}
        <div className="my-12 border-t border-white/15" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Noore. All rights reserved.
          </p>

          <p className="font-heading text-lg italic text-white/70">
            A fragrance that tells your story.
          </p>

          <Link
            href="/#home"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:border-accent hover:bg-accent"
          >
            <ArrowUp width={18} height={18} />
          </Link>

        </div>

      </div>
    </footer>
  );
}