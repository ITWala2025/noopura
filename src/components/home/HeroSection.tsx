"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2, Sparkles } from "lucide-react";
import { SCHOOL_INFO, SCHOOL_STATS } from "@/lib/data/noopura";

/**
 * High-gloss Hero Section with bespoke sage-toned classical dance background image,
 * luminous pearlescent/sage specular overlays, and containerless horizontal stats.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[94vh] flex-col justify-between overflow-hidden bg-sage-mist pt-32 pb-14 text-sage-deep">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bharatanatyam-hero.jpg"
          alt="Noopura Indian Classical School of Dance — authentic Bharatanatyam dancer in Araimandi stance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] md:object-center md:scale-[1.02]"
        />
        {/* Soothing sage & pearlescent glossy veil (light, airy, never dark) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#F4F8F3]/90 via-[#E7F0E8]/76 to-[#D7E6DA]/58"
        />
        {/* High-gloss specular light sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.12)_42%,rgba(255,255,255,0.48)_100%)]"
        />
        {/* Soft bottom fade into sage mist */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#EEF4EE]/95 via-[#EEF4EE]/55 to-transparent"
        />
      </div>

      {/* Subtle animated Mandala / Tala ring motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-90px] top-24 z-0 hidden lg:flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
          className="h-[460px] w-[460px] rounded-full border border-sage-moss/25 border-dashed flex items-center justify-center"
        >
          <div className="h-[320px] w-[320px] rounded-full border border-gold-temple/35 bg-white/20 backdrop-blur-[2px]" />
        </motion.div>
      </div>

      {/* Main Hero Copy */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 my-auto py-8">
        <div className="max-w-3xl space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-sage-forest backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(44,66,54,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-antique" />
            <span>{SCHOOL_INFO.location} · Classical Conservatory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.03] tracking-tight text-sage-deep"
          >
            Sacred Rhythm.{" "}
            <span className="bg-gradient-to-r from-sage-forest via-sage-moss to-gold-antique bg-clip-text text-transparent italic">
              Timeless
            </span>{" "}
            <span className="block">Classical Grace.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-xl text-base sm:text-lg leading-relaxed text-sage-deep/90"
          >
            <strong className="font-semibold text-sage-deep">Noopura</strong>{" "}
            cultivates the living heritage of{" "}
            <span className="font-semibold text-sage-forest">Bharatanatyam</span>,{" "}
            <span className="font-semibold text-sage-forest">Mohiniyattam</span>, and{" "}
            <span className="font-semibold text-sage-forest">Kuchipudi</span> in Dublin —
            guiding children, youth, and adults from foundational Adavus to
            full stage Arangetrams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-gradient-to-b from-sage-forest to-sage-deep px-7 py-3.5 text-sm font-semibold text-ivory-silk shadow-[0_14px_30px_-8px_rgba(27,42,34,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
            >
              <CalendarCheck2 className="h-4 w-4 text-gold-shimmer" />
              <span>Reserve a Trial or Term</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/classes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/85 bg-white/65 px-7 py-3.5 text-sm font-semibold text-sage-deep backdrop-blur-xl shadow-[0_10px_28px_-8px_rgba(44,66,54,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-300 hover:bg-white/85"
            >
              <span>Explore Curriculum</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Stats — No Container */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3 }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 border-t border-sage-forest/15 pt-7">
          {SCHOOL_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={
                idx > 0
                  ? "lg:border-l lg:border-sage-forest/15 lg:pl-8"
                  : ""
              }
            >
              <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-sage-deep via-sage-forest to-gold-antique bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-sage-deep">
                {stat.label}
              </p>
              <p className="text-xs font-medium text-sage-forest">{stat.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
