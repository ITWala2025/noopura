import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DANCE_CLASSES, CLASS_SLOTS } from "@/lib/data/noopura";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      classId,
      slotId,
      studentName,
      guardianName,
      email,
      phone,
      paymentProvider,
      amountEur,
    } = body;

    if (!classId || !studentName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required student or class details." },
        { status: 400 }
      );
    }

    const danceClass = DANCE_CLASSES.find((c) => c.id === classId);
    if (!danceClass) {
      return NextResponse.json(
        { error: "Selected dance class was not found." },
        { status: 404 }
      );
    }

    const slot = CLASS_SLOTS.find((s) => s.id === slotId);
    const reference = `NPR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentIntentId =
      paymentProvider === "razorpay"
        ? `order_RzP${Date.now()}`
        : `pi_Stripe${Date.now()}`;

    const supabase = createSupabaseServerClient();
    if (supabase) {
      // Prepared for live Supabase Postgres insertion when env vars are set.
      await supabase.from("bookings").insert({
        reference,
        student_name: studentName,
        guardian_name: guardianName ?? null,
        email,
        phone,
        class_id: classId,
        class_title: danceClass.title,
        slot_id: slot?.id ?? slotId,
        slot_label: slot
          ? `${slot.dayOfWeek} · ${slot.startTime} – ${slot.endTime}`
          : danceClass.scheduleLabel,
        amount_eur: Number(amountEur) || danceClass.monthlyFeeEur,
        status: "pending",
        payment_provider: paymentProvider ?? "stripe",
        payment_intent_id: paymentIntentId,
      } as never);
    }

    return NextResponse.json({
      success: true,
      reference,
      paymentIntentId,
      status: "confirmed",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid booking payload." },
      { status: 400 }
    );
  }
}
