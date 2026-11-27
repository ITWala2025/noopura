import React from "react";
import { BookingFunnel } from "@/components/booking/BookingFunnel";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Book a Classical Dance Class",
  description:
    "Reserve your seat in Bharatanatyam, Mohiniyattam, or Kuchipudi batches at Noopura Dublin with instant slot selection and Stripe/Razorpay checkout.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16 space-y-10">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Online Admissions
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-sage-deep">
          Reserve Your <span className="gold-gradient-text italic">Studio Seat</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm text-sage-forest/80">
          Select your classical discipline, pick a Dublin studio slot, and
          confirm your monthly or term tuition securely.
        </p>
      </header>

      <BookingFunnel />
    </div>
  );
}
