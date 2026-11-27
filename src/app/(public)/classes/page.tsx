import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { DANCE_CLASSES } from "@/lib/data/noopura";
import { buildPageMetadata, getCourseJsonLd } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Classes, Syllabus & Tuition",
  description:
    "Explore Bharatanatyam, Mohiniyattam, and Kuchipudi class levels, age groups, Dublin schedules, and monthly or term tuition at Noopura.",
  path: "/classes",
});

export default function ClassesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Curriculum &amp; Admissions
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-sage-deep">
          Classes &amp; <span className="gold-gradient-text italic">Syllabus</span>
        </h1>
        <p className="text-base text-sage-forest/80">
          Structured conservatory tracks tailored by age and classical
          experience across Dublin.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {DANCE_CLASSES.map((cls) => {
          const jsonLd = getCourseJsonLd(cls);
          return (
            <article
              key={cls.id}
              className="glass-panel p-7 flex flex-col justify-between space-y-6"
            >
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-sage-moss/30 bg-sage-celadon/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage-forest">
                    {cls.discipline} · {cls.level}
                  </span>
                  <span className="text-xs text-sage-forest/75">
                    {cls.ageGroup}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-sage-deep">
                  {cls.title}
                </h2>
                <p className="mt-2 text-sm text-sage-forest/80">
                  {cls.description}
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-sage-deep/90">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold-antique" />
                    {cls.scheduleLabel}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gold-antique" />
                    {cls.durationMinutes} mins · {cls.enrolled}/{cls.capacity} enrolled
                  </p>
                  <p className="flex items-center gap-1.5 sm:col-span-2">
                    <MapPin className="h-3.5 w-3.5 text-gold-antique" />
                    {cls.location}
                  </p>
                </div>

                <ul className="mt-5 space-y-2 border-t border-sage-forest/10 pt-4">
                  {cls.syllabus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-sage-forest/85"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-moss" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-sage-forest/10 pt-5">
                <div>
                  <p className="text-lg font-bold gold-gradient-text">
                    {formatCurrency(cls.monthlyFeeEur)}{" "}
                    <span className="text-xs font-normal text-sage-forest/75">
                      / month
                    </span>
                  </p>
                  <p className="text-[11px] text-sage-forest/75">
                    or {formatCurrency(cls.termFeeEur)} per 3-month term
                  </p>
                </div>
                <Link href={`/classes/${cls.id}/book`} className="btn-gold">
                  <span>Book Batch</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
