/**
 * Accordion styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * Orientation is not a variant. Every part styles itself off the `data-orientation`
 * attribute Ark sets, which keeps the matrix at nine combinations rather than
 * twenty-seven. The content snaps open and shut: the collapsible height keyframes
 * are gone, so nothing here references them.
 *
 * There is no `color`: an accordion row has no colour axis. The root's design axes
 * are `variant` and `size`, and both reach every part through the adapter's
 * variant context — no part takes them as its own props.
 */

export type AccordionVariant = "outline" | "soft" | "ghost";
export type AccordionSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface AccordionVariants {
  variant: AccordionVariant;
  size: AccordionSize;
}

export const accordionDefaults = { variant: "outline", size: "md" } as const;

/**
 * The introspection the previews and the docs read instead of a recipe object.
 * Shaped to match `cva` v1's `getSchema`, so adopting that later is a deletion.
 */
export const accordionSchema = {
  variant: { values: ["outline", "soft", "ghost"], defaultValue: "outline" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const;

/** Structural classes: no variant key touches these, so they are not shared. */
// (They live inline in each adapter's `cva` call, beside the part that wears them.)

export const accordionVariantData = {
  root: {
    outline:
      "divide-y divide-default overflow-hidden rounded-lg ring ring-default ring-inset data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
    soft: "gap-2",
    ghost:
      "divide-y divide-muted data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
  },
  item: {
    outline: "bg-default",
    soft: "overflow-hidden rounded-lg bg-muted",
    ghost: "bg-transparent",
  },
  trigger: {
    outline: "text-highlighted hover:bg-muted",
    soft: "text-highlighted hover:bg-accented/60",
    ghost: "text-toned hover:text-highlighted",
  },
} as const satisfies Record<string, Record<AccordionVariant, string>>;

export const accordionSizeData = {
  trigger: {
    sm: "min-h-9 px-3 text-sm group-data-[orientation=horizontal]/accordion:min-w-9",
    md: "min-h-11 px-4 text-sm group-data-[orientation=horizontal]/accordion:min-w-11",
    lg: "min-h-13 px-5 text-base group-data-[orientation=horizontal]/accordion:min-w-13",
  },
  leadingIcon: {
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
  },
  indicator: {
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
  },
  body: {
    sm: "px-3 pb-3 text-sm/6",
    md: "px-4 pb-4 text-sm/6",
    lg: "px-5 pb-5 text-base/7",
  },
} as const satisfies Record<string, Record<AccordionSize, string>>;

/** Everything the Accordion root accepts in both frameworks. */
export interface AccordionRootProps {
  variant?: AccordionVariant;
  size?: AccordionSize;
  /** Allow more than one row open at a time. */
  multiple?: boolean;
  /** Allow closing the open row, leaving none open. */
  collapsible?: boolean;
  /** Disable every row. */
  disabled?: boolean;
  /** @defaultValue `"vertical"` */
  orientation?: "horizontal" | "vertical";
}

/** Everything an Accordion row accepts in both frameworks. */
export interface AccordionItemProps {
  /** Identifies the row. Pass it to `defaultValue` to open the row up front. */
  value: string;
  disabled?: boolean;
}

/**
 * Everything an Accordion row's trigger accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface AccordionItemTriggerProps<F> {
  /** Icon shown before the label. */
  leadingIcon?: F;
  /** Replaces the chevron. */
  trailingIcon?: F;
}
