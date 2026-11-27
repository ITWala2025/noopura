import React from "react";
import { FAQ_ITEMS } from "@/lib/data/noopura";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about age groups, attire, trial classes, and term fees at Noopura Dublin.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Admissions Guide
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-sage-deep">
          Frequently Asked <span className="gold-gradient-text italic">Questions</span>
        </h1>
      </header>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className="glass-panel group p-6 cursor-pointer"
          >
            <summary className="list-none flex items-center justify-between gap-4 font-display text-xl font-semibold text-sage-deep">
              <span>{item.q}</span>
              <span className="text-gold-antique text-lg group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-sage-forest/80">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
