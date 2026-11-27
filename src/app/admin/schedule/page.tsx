"use client";

import React, { useState } from "react";
import { Plus, Trash2, CalendarOff, CheckCircle2 } from "lucide-react";
import { CLASS_SLOTS, DANCE_CLASSES } from "@/lib/data/noopura";
import type { ClassSlot } from "@/types/database";
import { cn } from "@/lib/utils";

export default function AdminSchedulePage() {
  const [slots, setSlots] = useState<ClassSlot[]>(CLASS_SLOTS);
  const [classId, setClassId] = useState(DANCE_CLASSES[0].id);
  const [dayOfWeek, setDayOfWeek] = useState("Saturday");
  const [startTime, setStartTime] = useState("15:00");
  const [endTime, setEndTime] = useState("16:00");
  const [studio, setStudio] = useState("Dundrum Studio A");
  const [instructor, setInstructor] = useState("Guru Shini");
  const [capacity, setCapacity] = useState(14);

  function handleAddSlot(e: React.FormEvent) {
    e.preventDefault();
    const newSlot: ClassSlot = {
      id: `slot-${Date.now()}`,
      classId,
      dayOfWeek,
      dateLabel: `Every ${dayOfWeek}`,
      startTime,
      endTime,
      studio,
      instructor,
      capacity: Number(capacity) || 12,
      bookedCount: 0,
      isHoliday: false,
    };
    setSlots((prev) => [newSlot, ...prev]);
  }

  function toggleHoliday(id: string) {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isHoliday: !s.isHoliday } : s))
    );
  }

  function deleteSlot(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="max-w-6xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-antique">
          Studio Operations
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sage-deep">
          Schedule &amp; Availability Manager
        </h1>
      </header>

      {/* Create Recurring Slot Form */}
      <form
        onSubmit={handleAddSlot}
        className="glass-panel p-6 sm:p-8 space-y-5"
      >
        <h2 className="font-display text-2xl font-semibold text-sage-deep">
          Add Recurring Class Slot
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          >
            {DANCE_CLASSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              )
            )}
          </select>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          />
          <input
            value={studio}
            onChange={(e) => setStudio(e.target.value)}
            placeholder="Studio Location"
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          />
          <input
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Instructor Name"
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          />
          <input
            type="number"
            min={1}
            max={40}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            placeholder="Capacity"
            className="rounded-xl border border-sage-forest/15 bg-white/85 px-3 py-2.5 text-sm text-sage-deep focus:border-sage-moss focus:outline-none"
          />
          <button type="submit" className="btn-gold">
            <Plus className="h-4 w-4" />
            <span>Create Slot</span>
          </button>
        </div>
      </form>

      {/* Active Slots List */}
      <div className="grid gap-4 md:grid-cols-2">
        {slots.map((slot) => {
          const cls = DANCE_CLASSES.find((c) => c.id === slot.classId);
          return (
            <div
              key={slot.id}
              className={cn(
                "glass-panel p-5 flex items-start justify-between gap-4",
                slot.isHoliday && "opacity-70 border-amber-400/50"
              )}
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-antique">
                  {slot.dayOfWeek} · {slot.startTime} – {slot.endTime}
                </p>
                <h3 className="font-display text-xl font-semibold text-sage-deep">
                  {cls?.title ?? slot.classId}
                </h3>
                <p className="text-xs text-sage-forest/80">
                  {slot.studio} · Instructor: {slot.instructor}
                </p>
                <p className="text-xs text-sage-deep pt-1">
                  Capacity: {slot.bookedCount} / {slot.capacity}
                  {slot.isHoliday && (
                    <span className="ml-2 text-amber-700 font-semibold">
                      (Holiday Exception Active)
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggleHoliday(slot.id)}
                  title="Toggle Holiday Exception"
                  className="inline-flex items-center gap-1 rounded-lg border border-sage-forest/15 bg-white/75 px-2.5 py-1.5 text-[11px] font-medium text-sage-deep hover:bg-white"
                >
                  {slot.isHoliday ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <CalendarOff className="h-3.5 w-3.5 text-amber-700" />
                      <span>Holiday</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => deleteSlot(slot.id)}
                  title="Delete Slot"
                  className="inline-flex items-center gap-1 rounded-lg border border-alta-rose/30 bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-alta-deep hover:bg-rose-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
