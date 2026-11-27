import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CreditCard,
  CalendarCog,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const ADMIN_LINKS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings & Audit",
    href: "/admin/bookings",
    icon: CreditCard,
  },
  {
    label: "Schedule Manager",
    href: "/admin/schedule",
    icon: CalendarCog,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sage-mist text-sage-deep flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-sage-forest/10 bg-white/70 backdrop-blur-2xl p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage-forest to-sage-deep text-gold-shimmer">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-sage-deep leading-none">
                  Noopura
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sage-forest/75 mt-1">
                  Enterprise Admin
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-sage-moss/30 bg-sage-celadon/70 px-2.5 py-0.5 text-[10px] font-semibold text-sage-forest">
              <ShieldCheck className="h-3 w-3" />
              RLS Ready
            </span>
          </div>

          <nav aria-label="Admin Navigation" className="space-y-1.5">
            {ADMIN_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-sage-forest transition-all hover:border-sage-moss/25 hover:bg-white/85 hover:text-sage-deep"
              >
                <item.icon className="h-4 w-4 text-gold-antique" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-sage-forest/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-sage-forest/80 hover:text-sage-deep transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
