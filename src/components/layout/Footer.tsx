import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Mail } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/noopura";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-sage-forest/15 bg-white/60 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sage-forest to-sage-deep text-gold-shimmer shadow-sm">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-2xl font-semibold text-sage-deep">
                {SCHOOL_INFO.fullName}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-sage-forest/80">
              Preserving and sharing the sacred lineage of Bharatanatyam,
              Mohiniyattam, and Kuchipudi in Dublin, Ireland — nurturing
              discipline, grace, and cultural storytelling across generations.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-sage-forest/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold-antique" />
                Dublin, Ireland
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gold-antique" />
                {SCHOOL_INFO.email}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-antique">
              Conservatory
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-sage-forest/80">
              <li>
                <Link href="/about" className="hover:text-sage-deep transition-colors">
                  Lineage &amp; Guru
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-sage-deep transition-colors">
                  Classes &amp; Syllabus
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sage-deep transition-colors">
                  Performances
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sage-deep transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-antique">
              Admissions &amp; Portal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-sage-forest/80">
              <li>
                <Link href="/book" className="hover:text-sage-deep transition-colors">
                  Book a Class
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sage-deep transition-colors">
                  Studio Locations
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-sage-deep transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sage-forest/10 pt-6 text-xs text-sage-forest/75">
          <p>
            © {new Date().getFullYear()} {SCHOOL_INFO.fullName}. All rights reserved.
          </p>
          <p className="text-sage-forest/65">
            Bharatanatyam · Mohiniyattam · Kuchipudi
          </p>
        </div>
      </div>
    </footer>
  );
}
