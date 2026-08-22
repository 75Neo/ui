import type { AccordionSlots, AccordionVariants, ClassValue } from "@75neo/styles";
import type { Component, PropType } from "vue";

/**
 * One row of the accordion. Extra keys are allowed, so a list that already exists in the
 * shape some API returns it can be passed straight in and read through `labelKey` and
 * `valueKey`.
 */
export interface AccordionItem {
  /** The trigger's text. */
  label?: string;
  /** Rendered before the label — a Lucide icon, or any component. */
  icon?: Component;
  /** Replaces the chevron, for this row alone. */
  trailingIcon?: Component;
  /**
   * Names this row's own slots: `#{slot}` replaces its whole panel, `#{slot}-body` only
   * what sits inside it. Without one, the shared `#content` and `#body` slots are used.
   */
  slot?: string;
  /** The panel's text, for a row that needs no markup of its own. */
  content?: string;
  /**
   * The row's value, which is also its key. Defaults to the index — give it something
   * stable if rows are added, removed or reordered, so open panels stay open.
   */
  value?: string;
  disabled?: boolean;
  /** Merged into this row's `item` class. */
  class?: ClassValue;
  /** Per-slot overrides for this row only, merged over the accordion's own `ui`. */
  ui?: AccordionSlots;
  [key: string]: unknown;
}

export type AccordionProps = AccordionVariants & {
  /** The rows. */
  items?: AccordionItem[];
  /** The chevron every row's trigger ends with. */
  trailingIcon?: Component;
  /** Which key of an item holds its label. */
  labelKey?: string;
  /** Which key of an item holds its value. */
  valueKey?: string;
  /**
   * Per-slot class overrides for the whole accordion — `{ trigger: "text-lg" }` reaches
   * every row.
   */
  ui?: AccordionSlots;
};

/** What every slot is handed. */
export interface AccordionSlotProps {
  item: AccordionItem;
  index: number;
  /** Whether this row is expanded. */
  open: boolean;
}

/**
 * Runtime props, for the reason given in `button/props.ts`: the variant types are mapped
 * types the SFC compiler cannot reduce to a list of names.
 */
export const accordionProps = {
  items: { type: Array as PropType<AccordionItem[]>, default: () => [] },
  trailingIcon: { type: [Object, Function] as PropType<Component>, default: undefined },
  labelKey: { type: String, default: "label" },
  valueKey: { type: String, default: "value" },
  variant: { type: String as PropType<AccordionProps["variant"]>, default: undefined },
  size: { type: String as PropType<AccordionProps["size"]>, default: undefined },
  colorPalette: {
    type: String as PropType<AccordionProps["colorPalette"]>,
    default: undefined,
  },
  ui: { type: Object as PropType<AccordionProps["ui"]>, default: undefined },
};
