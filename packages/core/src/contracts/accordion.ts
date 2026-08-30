import type { accordion } from "@75neo/styles";
import type { AssertSlots, SlotClass } from "../types";

/** Lookup key for `<Theme ui>` overrides and `useComponentUI`. */
export const accordionKey = "accordion";

export type AccordionSlot = AssertSlots<
  "root" | "item" | "header" | "trigger" | "leading" | "label" | "trailing" | "content" | "body",
  keyof ReturnType<typeof accordion>
>;

export type AccordionUI = Partial<Record<AccordionSlot, SlotClass>>;

/**
 * One entry of the `items` prop.
 *
 * `Node` is the framework's renderable-content type: React instantiates it with
 * `ReactNode`, Vue with `string`. Richer per-item content in Vue goes through the
 * scoped slots instead.
 */
export type AccordionItemData<Node = string> = {
  value?: string;
  label?: Node;
  content?: Node;
  leading?: Node;
  trailing?: Node;
  disabled?: boolean;
  ui?: AccordionUI;
};

/** Falls back to the item index so items without an explicit value still work. */
export function resolveAccordionValue(item: { value?: string }, index: number): string {
  return item.value && item.value.length > 0 ? item.value : String(index);
}

/** Ark's accordion always speaks arrays, whether or not `multiple` is set. */
export function toValueArray(value?: string | string[]): string[] | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value : [value];
}
