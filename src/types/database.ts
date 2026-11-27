export type DisciplineSlug = "bharatanatyam" | "mohiniyattam" | "kuchipudi";
export type BookingStatus = "confirmed" | "pending" | "cancelled";
export type PaymentProvider = "stripe" | "razorpay";

export interface DanceClass {
  id: string;
  slug: string;
  title: string;
  discipline: DisciplineSlug;
  level: "Beginner" | "Intermediate" | "Advanced & Arangetram";
  ageGroup: "Kids (5-9 yrs)" | "Youth & Girls (10-16 yrs)" | "Adults (17+ yrs)";
  durationMinutes: number;
  monthlyFeeEur: number;
  termFeeEur: number;
  instructor: string;
  location: string;
  capacity: number;
  enrolled: number;
  syllabus: string[];
  scheduleLabel: string;
  description: string;
}

export interface ClassSlot {
  id: string;
  classId: string;
  dayOfWeek: string;
  dateLabel: string;
  startTime: string;
  endTime: string;
  studio: string;
  instructor: string;
  capacity: number;
  bookedCount: number;
  isHoliday?: boolean;
}

export interface BookingRecord {
  id: string;
  reference: string;
  studentName: string;
  guardianName?: string;
  email: string;
  phone: string;
  classId: string;
  classTitle: string;
  slotId: string;
  slotLabel: string;
  amountEur: number;
  status: BookingStatus;
  paymentProvider: PaymentProvider;
  paymentIntentId: string;
  createdAt: string;
}

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: DanceClass;
        Insert: Omit<DanceClass, "id">;
        Update: Partial<DanceClass>;
      };
      class_slots: {
        Row: ClassSlot;
        Insert: Omit<ClassSlot, "id">;
        Update: Partial<ClassSlot>;
      };
      bookings: {
        Row: BookingRecord;
        Insert: Omit<BookingRecord, "id" | "createdAt">;
        Update: Partial<BookingRecord>;
      };
    };
  };
}
