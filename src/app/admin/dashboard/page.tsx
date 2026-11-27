import React from "react";
import Link from "next/link";
import {
  Euro,
  Users,
  Clock,
  CalendarRange,
  ArrowUpRight,
} from "lucide-react";
import {
  DANCE_CLASSES,
  SEED_BOOKINGS,
} from "@/lib/data/noopura";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const confirmedRevenue = SEED_BOOKINGS.filter(
    (b) => b.status === "confirmed"
  ).reduce((sum, b) => sum + b.amountEur, 0);

  const pendingCount = SEED_BOOKINGS.filter(
    (b) => b.status === "pending"
  ).length;

  const activeStudents = DANCE_CLASSES.reduce((sum, c) => sum + c.enrolled, 0);

  const metrics = [
    {
      label: "Total Revenue (MTD)",
      value: formatCurrency(confirmedRevenue),
      delta: "+14.2% vs last term",
      icon: Euro,
    },
    {
      label: "Active Students",
      value: String(activeStudents),
      delta: "Across 4 active batches",
      icon: Users,
    },
    {
      label: "Pending Bookings",
      value: String(pendingCount),
      delta: "Awaiting payment audit",
      icon: Clock,
    },
    {
      label: "Upcoming Batches",
      value: String(DANCE_CLASSES.length),
      delta: "Dundrum · Lucan · Blanchardstown",
      icon: CalendarRange,
    },
  ];

  return (
    <div className="max-w-6xl space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
            Conservatory Operations
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sage-deep">
            Executive Dashboard
          </h1>
        </div>
        <Link href="/admin/bookings" className="btn-gold">
          <span>Manage Bookings</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass-panel p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-sage-forest/80">
                {m.label}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-celadon text-sage-deep">
                <m.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold gold-gradient-text">
              {m.value}
            </p>
            <p className="text-xs text-sage-forest/75">{m.delta}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings Snapshot */}
      <section className="glass-panel p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-sage-deep">
            Recent Enrollments &amp; Audits
          </h2>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-sage-forest hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sage-forest/10 text-xs uppercase tracking-wider text-sage-forest/70">
                <th className="pb-3 pr-4">Reference</th>
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4">Batch</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-forest/10">
              {SEED_BOOKINGS.map((bk) => (
                <tr key={bk.id} className="text-sage-deep">
                  <td className="py-3.5 pr-4 font-mono text-xs text-gold-antique font-semibold">
                    {bk.reference}
                  </td>
                  <td className="py-3.5 pr-4 font-medium">{bk.studentName}</td>
                  <td className="py-3.5 pr-4 text-xs text-sage-forest/80">
                    {bk.classTitle}
                  </td>
                  <td className="py-3.5 pr-4 font-semibold">
                    {formatCurrency(bk.amountEur)}
                  </td>
                  <td className="py-3.5 capitalize text-xs">{bk.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
