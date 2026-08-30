import type { button } from "@75neo/styles";
import type { AssertSlots, SlotClass } from "../types";

/** Lookup key for `<Theme ui>` overrides and `useComponentUI`. */
export const buttonKey = "button";

export type ButtonSlot = AssertSlots<
  "base" | "leading" | "label" | "trailing",
  keyof ReturnType<typeof button>
>;

export type ButtonUI = Partial<Record<ButtonSlot, SlotClass>>;
