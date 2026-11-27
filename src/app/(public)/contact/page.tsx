import React from "react";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/noopura";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact & Studio Locations",
  description:
    "Reach Noopura Indian Classical School of Dance in Dundrum, Lucan, and Blanchardstown, Dublin.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    SCHOOL_INFO.whatsappPrefill
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Connect With Us
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-sage-deep">
          Dublin Studios &amp; <span className="gold-gradient-text italic">Inquiries</span>
        </h1>
      </header>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5">
          <div className="glass-panel p-7 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-sage-deep">
              Studio Venues
            </h2>
            <ul className="space-y-3 text-sm text-sage-forest/85">
              {SCHOOL_INFO.studios.map((studio) => (
                <li key={studio} className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-antique" />
                  <span>{studio}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-7 space-y-3">
            <p className="flex items-center gap-2 text-sm text-sage-deep">
              <Mail className="h-4 w-4 text-gold-antique" />
              {SCHOOL_INFO.email}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <form className="md:col-span-7 glass-panel p-7 sm:p-9 space-y-5">
          <h2 className="font-display text-2xl font-semibold text-sage-deep">
            Send an Admissions Inquiry
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Your Name"
              className="rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-3 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email Address"
              className="rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-3 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
            />
          </div>
          <input
            placeholder="Preferred Style (Bharatanatyam / Mohiniyattam / Kuchipudi)"
            className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-3 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
          />
          <textarea
            rows={4}
            required
            placeholder="Tell us the student's age and preferred Dublin studio..."
            className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-3 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
          />
          <button type="submit" className="btn-gold">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
