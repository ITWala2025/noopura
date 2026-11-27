"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  DANCE_CLASSES,
  CLASS_SLOTS,
} from "@/lib/data/noopura";
import type { PaymentProvider } from "@/types/database";
import { cn, formatCurrency } from "@/lib/utils";

interface BookingFunnelProps {
  initialClassId?: string;
}

type PlanType = "monthly" | "term";

export function BookingFunnel({ initialClassId }: BookingFunnelProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialClassId ? 2 : 1);
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialClassId && DANCE_CLASSES.some((c) => c.id === initialClassId)
      ? initialClassId
      : DANCE_CLASSES[0].id
  );
  const [planType, setPlanType] = useState<PlanType>("term");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider>("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const selectedClass = useMemo(
    () => DANCE_CLASSES.find((c) => c.id === selectedClassId) ?? DANCE_CLASSES[0],
    [selectedClassId]
  );

  const availableSlots = useMemo(
    () => CLASS_SLOTS.filter((s) => s.classId === selectedClass.id && !s.isHoliday),
    [selectedClass.id]
  );

  const activeSlot = useMemo(
    () => availableSlots.find((s) => s.id === selectedSlotId) ?? availableSlots[0],
    [availableSlots, selectedSlotId]
  );

  const amountEur =
    planType === "term"
      ? selectedClass.termFeeEur
      : selectedClass.monthlyFeeEur;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClass.id,
          slotId: activeSlot?.id ?? "",
          planType,
          studentName,
          guardianName: guardianName || undefined,
          email,
          phone,
          notes,
          paymentProvider,
          amountEur,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to complete booking.");
      }

      setConfirmedRef(data.reference);
      setStep(4);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Payment simulation failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const steps = [
    { num: 1, label: "Discipline & Batch" },
    { num: 2, label: "Schedule Slot" },
    { num: 3, label: "Student & Payment" },
  ];

  return (
    <div className="glass-panel p-6 sm:p-10">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-sage-forest/10 pb-6">
          {steps.map((s) => {
            const active = step === s.num;
            const completed = step > s.num;
            return (
              <div key={s.num} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                    active
                      ? "bg-gradient-to-b from-sage-forest to-sage-deep text-ivory-silk shadow-sm"
                      : completed
                      ? "bg-sage-celadon text-sage-deep border border-sage-moss/40"
                      : "bg-white/60 text-sage-forest/70 border border-sage-forest/15"
                  )}
                >
                  {completed ? "✓" : s.num}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    active ? "text-sage-deep" : "text-sage-forest/65"
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Select Class & Plan */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {DANCE_CLASSES.map((cls) => {
                const selected = cls.id === selectedClassId;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => {
                      setSelectedClassId(cls.id);
                      setSelectedSlotId("");
                    }}
                    className={cn(
                      "text-left rounded-2xl border p-5 transition-all",
                      selected
                        ? "border-sage-forest bg-sage-celadon/75 shadow-sm"
                        : "border-white/80 bg-white/60 hover:bg-white/85"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-antique">
                        {cls.discipline} · {cls.level}
                      </span>
                      <span className="rounded-full bg-sage-mist px-2.5 py-0.5 text-[11px] font-medium text-sage-forest">
                        {cls.ageGroup}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-sage-deep">
                      {cls.title}
                    </h3>
                    <p className="mt-1 text-xs text-sage-forest/80 line-clamp-2">
                      {cls.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-sage-forest">
                      <span>{cls.scheduleLabel}</span>
                      <span className="font-bold text-sage-deep">
                        {formatCurrency(cls.monthlyFeeEur)}/mo
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Plan Toggle */}
            <div className="rounded-2xl border border-white/80 bg-white/65 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-sage-deep">
                  Select Tuition Plan
                </p>
                <p className="text-xs text-sage-forest/75">
                  Full 3-month term pass includes priority festival casting.
                </p>
              </div>
              <div className="inline-flex rounded-full border border-sage-forest/15 bg-sage-mist p-1">
                <button
                  type="button"
                  onClick={() => setPlanType("monthly")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                    planType === "monthly"
                      ? "bg-gradient-to-b from-sage-forest to-sage-deep text-ivory-silk"
                      : "text-sage-forest hover:text-sage-deep"
                  )}
                >
                  Monthly ({formatCurrency(selectedClass.monthlyFeeEur)})
                </button>
                <button
                  type="button"
                  onClick={() => setPlanType("term")}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                    planType === "term"
                      ? "bg-gradient-to-b from-sage-forest to-sage-deep text-ivory-silk"
                      : "text-sage-forest hover:text-sage-deep"
                  )}
                >
                  Full Term ({formatCurrency(selectedClass.termFeeEur)})
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-gold"
              >
                <span>Choose Schedule Slot</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Calendar & Slot Availability */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-antique">
                Selected Batch
              </p>
              <h3 className="font-display text-2xl font-semibold text-sage-deep">
                {selectedClass.title}
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {availableSlots.map((slot) => {
                const spotsLeft = Math.max(0, slot.capacity - slot.bookedCount);
                const isSelected = (activeSlot?.id ?? "") === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={spotsLeft === 0}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={cn(
                      "text-left rounded-2xl border p-5 transition-all",
                      isSelected
                        ? "border-sage-forest bg-sage-celadon/75 shadow-sm"
                        : "border-white/80 bg-white/60 hover:bg-white/85",
                      spotsLeft === 0 && "opacity-45 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                        <Calendar className="h-4 w-4 text-gold-antique" />
                        {slot.dayOfWeek}
                      </span>
                      <span className="rounded-full bg-sage-mist px-2.5 py-0.5 text-[11px] font-semibold text-sage-forest">
                        {spotsLeft} spots left
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-sage-forest/85">
                      <p className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold-antique" />
                        {slot.startTime} – {slot.endTime}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold-antique" />
                        {slot.studio}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-gold-antique" />
                        {slot.instructor}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-glass"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-gold"
              >
                <span>Student &amp; Payment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Student Details & Stripe/Razorpay Checkout */}
        {step === 3 && (
          <motion.form
            key="step-3"
            onSubmit={handleCheckout}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-sage-deep mb-1.5">
                  Student Full Name *
                </label>
                <input
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aaradhya Nair"
                  className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-2.5 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sage-deep mb-1.5">
                  Parent / Guardian Name (for Kids &amp; Youth)
                </label>
                <input
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Optional for adults"
                  className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-2.5 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sage-deep mb-1.5">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.ie"
                  className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-2.5 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sage-deep mb-1.5">
                  WhatsApp / Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+353 87 000 0000"
                  className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-2.5 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sage-deep mb-1.5">
                Prior Experience or Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any previous dance training or questions for Guru Shini..."
                className="w-full rounded-xl border border-sage-forest/15 bg-white/80 px-4 py-2.5 text-sm text-sage-deep placeholder:text-sage-forest/50 focus:border-sage-moss focus:outline-none"
              />
            </div>

            {/* Payment Gateway Selector */}
            <div className="rounded-2xl border border-white/80 bg-white/70 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep">
                  <CreditCard className="h-4 w-4 text-gold-antique" />
                  Payment Gateway
                </span>
                <span className="text-lg font-bold gold-gradient-text">
                  {formatCurrency(amountEur)}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(["stripe", "razorpay"] as const).map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => setPaymentProvider(provider)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all",
                      paymentProvider === provider
                        ? "border-sage-forest bg-sage-celadon/80 text-sage-deep"
                        : "border-sage-forest/15 bg-white/60 text-sage-forest/80 hover:bg-white/90"
                    )}
                  >
                    <span>
                      {provider === "stripe"
                        ? "Stripe (Card / Apple Pay)"
                        : "Razorpay (International / UPI)"}
                    </span>
                    <ShieldCheck className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <p className="rounded-xl border border-alta-rose/50 bg-alta-crimson/10 px-4 py-2.5 text-xs text-alta-deep">
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-glass"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4 text-gold-shimmer" />
                <span>
                  {isSubmitting
                    ? "Confirming Enrollment..."
                    : `Pay ${formatCurrency(amountEur)} & Confirm`}
                </span>
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center space-y-5"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-celadon border border-sage-moss/40 text-sage-deep">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
              Enrollment Confirmed
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-sage-deep">
              Namaste, {studentName || "Disciple"}!
            </h3>
            <p className="mx-auto max-w-md text-sm text-sage-forest/85">
              Your seat in <strong className="text-sage-deep">{selectedClass.title}</strong>{" "}
              ({activeSlot?.dayOfWeek} · {activeSlot?.startTime}) is reserved.
            </p>
            <div className="mx-auto max-w-sm rounded-2xl border border-sage-moss/30 bg-white/75 p-4 text-xs space-y-1.5">
              <p className="text-sage-forest">
                Booking Reference:{" "}
                <strong className="text-sage-deep">{confirmedRef}</strong>
              </p>
              <p className="text-sage-forest">
                Gateway:{" "}
                <strong className="uppercase text-sage-deep">
                  {paymentProvider}
                </strong>{" "}
                · {formatCurrency(amountEur)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
