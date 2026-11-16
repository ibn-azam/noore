"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const inputClass =
  "w-full border border-[#E8E1D6] bg-[#F8F5EF]/50 px-4 py-3.5 text-sm text-[#25221F] outline-none transition-colors placeholder:text-[#A49D93] focus:border-[#B08D57] focus:bg-white";

export default function RegisterPage() {
  const  router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());

  toast.promise(
    authClient.signUp
      .email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data;
      }),
    {
      loading: "Creating account...",
      success: () => {
        router.push("/login");
        return "Account created!";
      },
      error: (err) => err.message || "Something went wrong.",
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
              Discover Noore
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl leading-tight lg:text-5xl">
              Your next favorite,
              <span className="block italic text-[#D9BE91]">starts here.</span>
            </h1>
          </div>
          <p className="relative mt-12 max-w-xs text-sm leading-7 text-white/60">
            Create an account and begin discovering fragrances selected to make
            every moment memorable.
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
            Create account
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#77716A]">
            Join Noore to continue your fragrance journey.
          </p>

          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="mt-8 space-y-5"
          >
            {/* Full Name */}
            <TextField
              name="name"
              isRequired
              className="w-full"
              validate={(value) =>
                (value ?? "").trim().length >= 2 ||
                "Name must be at least 2 characters."
              }
            >
              <Label className="mb-2 block text-xs font-semibold text-[#37312B]">
                Full name
              </Label>
              <Input
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
              <FieldError className="text-xs text-[#37312B]/50" />
            </TextField>

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
              validate={(value) =>
                (value ?? "").length >= 8 ||
                "Password must be at least 8 characters."
              }
            >
              <Label className="mb-2 block text-xs font-semibold text-[#37312B]">
                Password
              </Label>
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className={inputClass}
              />
              <FieldError className="text-xs text-[#37312B]/50" />
            </TextField>

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 bg-[#25221F] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#B08D57] disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
              <ArrowUpRight
                width={16}
                height={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Button>
          </Form>

          <p className="mt-5 text-center text-sm text-[#77716A]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#8D7045] transition-colors hover:text-[#25221F]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
