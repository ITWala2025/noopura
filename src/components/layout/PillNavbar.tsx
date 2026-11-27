"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Classes", href: "/classes" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function PillNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary Navigation"
        className="relative flex w-full max-w-5xl items-center justify-between rounded-full border border-white/80 bg-white/70 px-3 py-2 backdrop-blur-2xl shadow-[0_14px_38px_-10px_rgba(44,66,54,0.2),inset_0_1px_0_rgba(255,255,255,0.95)]"
      >
        {/* Subtle glossy top rim */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full pl-2 pr-3 py-1 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sage-forest to-sage-deep text-gold-shimmer shadow-sm">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-wide text-sage-deep">
              Noopura
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.22em] text-sage-forest/75">
              Dublin · Est. Parampara
            </span>
          </div>
        </Link>

        {/* Desktop Pill Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-ivory-silk font-semibold"
                      : "text-sage-forest/85 hover:text-sage-deep"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="noopura-pill-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-sage-forest to-sage-deep shadow-sm"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/dashboard"
            aria-label="Admin Portal"
            title="Enterprise Admin Portal"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-sage-forest/15 bg-white/75 text-sage-forest transition-colors hover:border-sage-forest/40 hover:text-sage-deep"
          >
            <ShieldCheck className="h-4 w-4" />
          </Link>

          <Link
            href="/book"
            className="rounded-full bg-gradient-to-b from-alta-rose to-alta-crimson px-4 py-2 text-xs sm:text-sm font-semibold text-ivory-silk shadow-[0_8px_20px_-6px_rgba(158,27,43,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            Book Class
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-sage-forest/15 bg-white/75 text-sage-deep"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Frosted Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/85 bg-white/90 p-4 backdrop-blur-2xl shadow-[0_20px_45px_-12px_rgba(44,66,54,0.2)] md:hidden"
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-gradient-to-r from-sage-forest to-sage-deep text-ivory-silk font-semibold"
                          : "text-sage-forest hover:bg-sage-mist"
                      )}
                    >
                      <span>{item.label}</span>
                      {active && <span className="h-2 w-2 rounded-full bg-gold-shimmer" />}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-sage-forest/10">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-sage-forest/80 hover:bg-sage-mist hover:text-sage-deep"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
