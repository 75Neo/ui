import type { avatar } from "@75neo/styles";
import type { AssertSlots, SlotClass } from "../types";
import { getInitials } from "../utils";

/** Lookup key for `<Theme ui>` overrides and `useComponentUI`. */
export const avatarKey = "avatar";

export type AvatarSlot = AssertSlots<
  "root" | "image" | "fallback" | "icon",
  keyof ReturnType<typeof avatar>
>;

export type AvatarUI = Partial<Record<AvatarSlot, SlotClass>>;

/** `text` wins when given, otherwise initials are derived from the alt text. */
export function resolveAvatarFallback(text?: string, alt?: string): string {
  if (text) return text;
  if (alt) return getInitials(alt);
  return "";
}
