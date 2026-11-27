"use client";

import React, { useMemo, useState } from "react";
import { Search, CheckCircle2, XCircle, Clock } from "lucide-react";
import { SEED_BOOKINGS } from "@/lib/data/noopura";
import type { BookingRecord, BookingStatus } from "@/types/database";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_FILTERS: Array<"all" | BookingStatus> = [
  "all",
  "confirmed",
  "pending",
  "cancelled",
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(SEED_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus =
        statusFilter === "all" || b.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        b.studentName.toLowerCase().includes(q) ||
        b.reference.toLowerCase().includes(q) ||
        b.paymentIntentId.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  function updateStatus(id: string, nextStatus: BookingStatus) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: nextStatus } : b))
    );
  }

  return (
    <div className="max-w-6xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Revenue &amp; Compliance
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sage-deep">
          Bookings &amp; Payment Audit
        </h1>
      </header>

      {/* Search & Filter Controls */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-sage-forest/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, reference, email, or payment ID..."
            className="w-full rounded-full border border-sage-forest/15 bg-white/85 pl-10 pr-4 py-2 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all",
                statusFilter === st
                  ? "bg-gradient-to-b from-sage-forest to-sage-deep text-ivory-silk"
                  : "border border-sage-forest/15 bg-white/65 text-sage-forest hover:text-sage-deep"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-panel p-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage-forest/10 text-xs uppercase tracking-wider text-sage-forest/70">
              <th className="pb-3 pr-4">Ref</th>
              <th className="pb-3 pr-4">Student &amp; Contact</th>
              <th className="pb-3 pr-4">Class &amp; Slot</th>
              <th className="pb-3 pr-4">Payment Audit</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-forest/10">
            {filtered.map((bk) => (
              <tr key={bk.id} className="align-top">
                <td className="py-4 pr-4 font-mono text-xs font-semibold text-gold-antique">
                  {bk.reference}
                </td>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-sage-deep">
                    {bk.studentName}
                  </p>
                  <p className="text-xs text-sage-forest/80">{bk.email}</p>
                  <p className="text-xs text-sage-forest/80">{bk.phone}</p>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-xs font-medium text-sage-deep">
                    {bk.classTitle}
                  </p>
                  <p className="text-xs text-sage-forest/75">{bk.slotLabel}</p>
                </td>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-sage-deep">
                    {formatCurrency(bk.amountEur)}
                  </p>
                  <p className="text-[11px] font-semibold uppercase text-gold-antique">
                    {bk.paymentProvider}
                  </p>
                  <p className="font-mono text-[11px] text-sage-forest/75">
                    {bk.paymentIntentId}
                  </p>
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                      bk.status === "confirmed" &&
                        "bg-sage-celadon text-sage-deep",
                      bk.status === "pending" &&
                        "bg-amber-100 text-amber-800",
                      bk.status === "cancelled" &&
                        "bg-rose-100 text-alta-deep"
                    )}
                  >
                    {bk.status === "confirmed" && (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {bk.status === "pending" && <Clock className="h-3 w-3" />}
                    {bk.status === "cancelled" && (
                      <XCircle className="h-3 w-3" />
                    )}
                    {bk.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    {bk.status !== "confirmed" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(bk.id, "confirmed")}
                        className="rounded-lg border border-sage-moss/40 bg-sage-celadon px-2.5 py-1 text-[11px] font-semibold text-sage-deep hover:bg-sage-soft/60"
                      >
                        Approve
                      </button>
                    )}
                    {bk.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(bk.id, "cancelled")}
                        className="rounded-lg border border-alta-rose/30 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-alta-deep hover:bg-rose-100"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
