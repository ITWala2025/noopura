import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind CSS class names cleanly without specificity collisions. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format currency amounts consistently in EUR (Dublin) or INR when specified. */
export function formatCurrency(amount: number, currency: "EUR" | "INR" = "EUR"): string {
  return new Intl.NumberFormat(currency === "EUR" ? "en-IE" : "en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
