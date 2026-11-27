"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/noopura";

/**
 * Persistent icon-only WhatsApp speed-dial action.
 * No text labels — uses a subtle temple-gold & emerald pulse ring.
 */
export function WhatsAppFab() {
  const href = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    SCHOOL_INFO.whatsappPrefill
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Noopura on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.35 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold-temple/50 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_12px_32px_rgba(16,185,129,0.45)]"
    >
      {/* Premium pulse halo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-gold-bright/70 animate-ping opacity-35"
      />
      <MessageCircle className="relative h-6 w-6 stroke-[2.2]" />
    </motion.a>
  );
}
