import React from "react";
import Image from "next/image";
import { Sparkles, Calendar } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Gallery & Performances",
  description:
    "Explore Arangetrams, Dublin cultural festivals, and classical dance productions by Noopura Indian Classical School of Dance.",
  path: "/gallery",
});

const PERFORMANCES = [
  {
    title: "Navaratri Natya Samarpanam",
    venue: "Mill Theatre, Dundrum",
    year: "2026",
    form: "Bharatanatyam Ensemble",
    image: "/images/gallery/navaratri-bharatanatyam.jpg",
    caption: "Full-length Margam showcase featuring 28 youth and adult disciples.",
  },
  {
    title: "Lasya — Kerala Heritage Evening",
    venue: "National Concert Hall Studio, Dublin",
    year: "2025",
    form: "Mohiniyattam",
    image: "/images/gallery/lasya-mohiniyattam.jpg",
    caption: "Lyrical Sopana Sangeetham presentation led by Guru Shini.",
  },
  {
    title: "Tarangam & Kuchipudi Gala",
    venue: "Draíocht Arts Centre, Blanchardstown",
    year: "2025",
    form: "Kuchipudi",
    image: "/images/gallery/tarangam-kuchipudi.jpg",
    caption: "Dynamic brass-plate Tarangam and Bhamakalapam excerpts.",
  },
  {
    title: "Annual Salangai Pooja & Arangetram",
    venue: "Dublin City Cultural Hall",
    year: "2024",
    form: "Bharatanatyam Solo Debut",
    image: "/images/gallery/salangai-arangetram.jpg",
    caption: "Traditional ghungroo blessing ceremony and solo repertoire debut.",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Stage &amp; Productions
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-sage-deep">
          Performances &amp; <span className="gold-gradient-text italic">Arangetrams</span>
        </h1>
        <p className="text-base text-sage-deep/85">
          Highlights from Noopura&apos;s stage productions across Dublin and
          Ireland.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {PERFORMANCES.map((item) => (
          <article key={item.title} className="glass-panel overflow-hidden p-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-gold-antique">
              <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                {item.form}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-sage-forest">
                <Calendar className="h-3.5 w-3.5" />
                {item.year}
              </span>
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl border border-white/80 bg-sage-celadon shadow-inner">
              <Image
                src={item.image}
                alt={`${item.title} — ${item.form}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/45 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full border border-white/85 bg-white/85 px-3 py-1 text-xs font-semibold text-sage-deep backdrop-blur-md">
                {item.venue}
              </span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-sage-deep">
              {item.title}
            </h2>
            <p className="text-sm text-sage-deep/85">{item.caption}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
