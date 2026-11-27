"use client";

import React from "react";
import { motion } from "framer-motion";
import { SCHOOL_INFO } from "@/lib/data/noopura";

/**
 * Persistent icon-only WhatsApp speed-dial action using the official WhatsApp logo.
 * No text labels — uses a subtle pulse ring.
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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)]"
    >
      {/* Premium pulse halo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-35"
      />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative h-7 w-7 fill-current"
      >
        <path d="M16.004 2.667C8.64 2.667 2.67 8.637 2.67 16c0 2.352.616 4.648 1.787 6.672L2.667 29.333l6.816-1.787A13.27 13.27 0 0 0 16.004 29.333c7.364 0 13.33-5.97 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333Zm0 24.442a11.06 11.06 0 0 1-5.643-1.547l-.405-.24-4.045 1.061 1.08-3.941-.264-.42A11.057 11.057 0 0 1 4.906 16c0-6.128 4.985-11.112 11.098-11.112 6.125 0 11.109 4.984 11.109 11.112 0 6.127-4.984 11.109-11.109 11.109Zm6.096-8.322c-.334-.167-1.976-.975-2.283-1.087-.306-.112-.529-.167-.752.167-.223.335-.863 1.087-1.058 1.31-.195.223-.39.251-.724.084-.334-.167-1.41-.52-2.685-1.657-.993-.885-1.663-1.978-1.858-2.313-.195-.334-.021-.515.146-.681.15-.15.334-.39.501-.585.167-.195.223-.334.334-.557.112-.223.056-.418-.028-.585-.084-.167-.752-1.812-1.031-2.481-.271-.651-.547-.563-.752-.573-.195-.01-.418-.012-.64-.012-.223 0-.585.084-.891.418-.306.334-1.17 1.143-1.17 2.787 0 1.645 1.198 3.234 1.365 3.457.167.223 2.357 3.6 5.71 5.048.798.344 1.421.55 1.906.704.801.255 1.53.219 2.106.133.642-.096 1.976-.808 2.255-1.588.279-.78.279-1.449.195-1.588-.084-.139-.306-.223-.64-.39Z" />
      </svg>
    </motion.a>
  );
}
