import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Quote, CheckCircle2 } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { DISCIPLINES, TESTIMONIALS } from "@/lib/data/noopura";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Featured Classical Disciplines */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
              Classical Lineage
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-sage-deep">
              Three Sacred Traditions
            </h2>
          </div>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sage-forest hover:text-sage-deep transition-colors"
          >
            <span>View Full Curriculum &amp; Fees</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {DISCIPLINES.map((item) => (
            <article
              key={item.slug}
              className="glass-panel group flex flex-col justify-between p-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-antique">
                    {item.origin}
                  </span>
                  <span className="font-display text-lg text-sage-moss">
                    {item.sanskrit}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-sage-deep">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-deep/85">
                  {item.essence}
                </p>
                <ul className="mt-5 space-y-2">
                  {item.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-start gap-2 text-xs text-sage-deep/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-moss" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4 border-t border-sage-forest/10">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-alta-crimson group-hover:gap-2.5 transition-all"
                >
                  <span>Enroll in {item.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
            Community Voices
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-sage-deep">
            Reflections from Our Dublin Sangha
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className="glass-panel p-7 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-6 w-6 text-sage-moss/60 mb-4" />
                <p className="text-sm leading-relaxed text-sage-deep/90 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <footer className="mt-6 pt-4 border-t border-sage-forest/10">
                <p className="text-sm font-semibold text-sage-deep">
                  {t.author}
                </p>
                <p className="text-xs font-medium text-sage-forest">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-8">
        <div className="glass-panel p-8 sm:p-12 text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-moss/30 bg-sage-celadon/60 px-3.5 py-1 text-xs font-medium text-sage-forest">
            <Sparkles className="h-3.5 w-3.5 text-gold-antique" />
            Begin Your Classical Journey
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-sage-deep">
            Step Onto the Sacred Floor
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-sage-forest/80">
            Reserve a trial session or full term in Bharatanatyam, Mohiniyattam,
            or Kuchipudi across our Dublin studios.
          </p>
          <div className="pt-2">
            <Link href="/book" className="btn-gold">
              <span>Book Your Class Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
