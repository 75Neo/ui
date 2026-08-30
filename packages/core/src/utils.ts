import { twMerge } from "tailwind-merge";
import type { SlotClass } from "./types";

export function applySlotClass(base: string, slotClass?: SlotClass): string {
  if (!slotClass) return base;
  if (typeof slotClass === "function") return slotClass(base);
  return twMerge(base, slotClass);
}

export function getInitials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
