import React from "react";
import { notFound } from "next/navigation";
import { BookingFunnel } from "@/components/booking/BookingFunnel";
import { DANCE_CLASSES } from "@/lib/data/noopura";
import { buildPageMetadata } from "@/lib/seo";

interface ClassBookPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return DANCE_CLASSES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: ClassBookPageProps) {
  const cls = DANCE_CLASSES.find((c) => c.id === params.id);
  return buildPageMetadata({
    title: cls ? `Book ${cls.title}` : "Book Class",
    description:
      cls?.description ??
      "Reserve your Indian classical dance class slot at Noopura Dublin.",
    path: `/classes/${params.id}/book`,
  });
}

export default function ClassBookPage({ params }: ClassBookPageProps) {
  const cls = DANCE_CLASSES.find((c) => c.id === params.id);
  if (!cls) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16 space-y-10">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Direct Batch Enrollment
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-sage-deep">
          {cls.title}
        </h1>
        <p className="mx-auto max-w-xl text-sm text-sage-forest/80">
          {cls.location} · {cls.scheduleLabel}
        </p>
      </header>

      <BookingFunnel initialClassId={cls.id} />
    </div>
  );
}
