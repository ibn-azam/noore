import { CartProvider } from "@/components/CartProvider";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Noore | Discover Your Signature Scent",
  description: "Discover elegant fragrances with Noore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <CartProvider>
          <main>{children}</main>
          <Toaster position="top-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}