import React from "react";
import Link from "next/link";
import { Award, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { SCHOOL_INFO } from "@/lib/data/noopura";

export const metadata = buildPageMetadata({
  title: "About Noopura & Guru Shini",
  description:
    "Discover the lineage, Guru-Shishya philosophy, and classical dance faculty at Noopura Indian Classical School of Dance in Dublin, Ireland.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 space-y-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Our Lineage &amp; Philosophy
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-sage-deep">
          Preserving <span className="gold-gradient-text italic">Natya</span>{" "}
          Across Generations
        </h1>
        <p className="text-base leading-relaxed text-sage-forest/80">
          Founded in Dublin as <em>Noopura by Shini</em>, our conservatory is
          dedicated to transmitting the authentic grammar, rhythmic rigor, and
          spiritual depth of South Indian classical dance to the Irish-Indian
          diaspora and wider arts community.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: "Natya Shastra Rooted",
            body: "Every batch integrates Nritta (pure rhythm), Nritya (expressive storytelling), and Natya (dramatic character work) grounded in classical texts.",
          },
          {
            icon: HeartHandshake,
            title: "Guru-Shishya Parampara",
            body: "Small studio cohorts ensure personal posture correction, mudra refinement, and lifelong mentorship from beginner steps to Arangetram.",
          },
          {
            icon: Award,
            title: "Stage & Cultural Excellence",
            body: "Students regularly perform at Dublin cultural festivals, embassy showcases, and annual conservatory productions.",
          },
        ].map((card) => (
          <div key={card.title} className="glass-panel p-7 space-y-3">
            <card.icon className="h-6 w-6 text-gold-antique" />
            <h2 className="font-display text-2xl font-semibold text-sage-deep">
              {card.title}
            </h2>
            <p className="text-sm leading-relaxed text-sage-forest/80">
              {card.body}
            </p>
          </div>
        ))}
      </section>

      <section className="glass-panel p-8 sm:p-10 grid gap-8 md:grid-cols-12 items-center">
        <div className="md:col-span-8 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
            Artistic Director &amp; Principal Guru
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-sage-deep">
            {SCHOOL_INFO.founder}
          </h2>
          <p className="text-sm leading-relaxed text-sage-forest/80">
            Trained extensively in Bharatanatyam, Mohiniyattam, and Kuchipudi,
            Guru Shini has mentored over 180 students in Ireland over the past
            decade. Her pedagogy pairs classical discipline with joyful cultural
            connection for young learners and adult practitioners alike.
          </p>
          <Link href="/book" className="btn-gold inline-flex">
            <span>Join a Batch with Guru Shini</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="md:col-span-4 rounded-2xl border border-sage-moss/25 bg-sage-celadon/60 p-6 space-y-2 text-xs text-sage-deep">
          <p className="font-semibold text-gold-antique uppercase tracking-wider">
            Dublin Studios
          </p>
          {SCHOOL_INFO.studios.map((s) => (
            <p key={s} className="text-sage-forest/85">
              • {s}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
