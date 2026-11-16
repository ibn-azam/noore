"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Sparkles } from "@gravity-ui/icons";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const inputClass =
  "w-full border border-[#E8E1D6] bg-[#F8F5EF]/50 px-4 py-3.5 text-sm text-[#25221F] outline-none transition-colors placeholder:text-[#A49D93] focus:border-[#B08D57] focus:bg-white";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    toast.promise(
      authClient.signIn
        .email({
          email: String(userData.email || "").trim(),
          password: String(userData.password || ""),
        })
        .then(({ data, error }) => {
          if (error) throw new Error(error.message || "Login failed.");
          return data;
        }),
      {
        loading: "Signing in...",
        success: () => {
          router.push("/");
          return "Signed in successfully!";
        },
        error: (err) => err.message || "Unable to sign in right now.",
        finally: () => setIsLoading(false),
      }
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] px-5 py-16 md:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#B08D57]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#B08D57]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white shadow-[0_20px_60px_rgba(37,34,31,0.06)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#25221F] p-10 text-white md:flex lg:p-12">
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-[#B08D57]/20" />
          <div className="relative">
            <Sparkles width={28} height={28} className="mb-8 text-[#D9BE91]" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9BE91]">
              Welcome to Noore
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl leading-tight lg:text-5xl">
              A signature scent,
              <span className="block italic text-[#D9BE91]">
                made personal.
              </span>
            </h1>
          </div>
          <p className="relative mt-12 max-w-xs text-sm leading-7 text-white/60">
            Sign in to continue your journey and discover fragrances selected
            for you.
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-14">
          <div className="mb-8 md:hidden">
            <Link
              href="/"
              className="font-[var(--font-heading)] text-3xl font-semibold tracking-wide text-[#25221F]"
            >
              Noore<span className="text-[#B08D57]">.</span>
            </Link>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Your account
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-4xl font-medium text-[#25221F] sm:text-5xl">
            Sign in
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#77716A]">
            Welcome back. Enter your details to access your account.
          </p>

          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <TextField name="email" type="email" isRequired className="w-full">
              <Label className="mb-2 block text-xs font-semibold text-[#37312B]">
                Email address
              </Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
              <FieldError className="text-xs text-[#37312B]/50" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type="password"
              isRequired
              className="w-full"
            >
              <Label className="mb-2 block text-xs font-semibold text-[#37312B]">
                Password
              </Label>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className={inputClass}
              />
              <FieldError className="text-xs text-[#37312B]/50" />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 bg-[#25221F] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#B08D57] disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowUpRight
                width={16}
                height={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Button>
          </Form>

          <p className="mt-5 text-center text-sm text-[#77716A]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#8D7045] transition-colors hover:text-[#25221F]"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}