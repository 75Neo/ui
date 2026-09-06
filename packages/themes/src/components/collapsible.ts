import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Collapsible styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * This is Accordion's row without the accordion around it, and it wears the same
 * vocabulary on purpose — the same three variants, the same three sizes — so the two
 * read as siblings on a page. What differs is that nothing coordinates it: no set of
 * rows taking turns, so no `value` and no `multiple`.
 *
 * The rule between the trigger and the panel is the panel's own `border-t`, not
 * `divide-y` on the root. A closed panel stays in the DOM carrying `hidden`, and
 * Tailwind's divider is a border on the element before it, so it would draw a stray
 * line inside the bottom edge of every closed panel.
 *
 * Disabled is styled with `data-disabled:`, even though the trigger is a native
 * button: Ark's Collapsible never sets the real attribute, where Accordion's does.
 * The panel snaps open and shut, so nothing here references height keyframes.
 */

export type CollapsibleVariant = "outline" | "soft" | "ghost";
export type CollapsibleSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface CollapsibleVariants {
  variant: CollapsibleVariant;
  size: CollapsibleSize;
}

export const collapsibleDefaults = { variant: "outline", size: "md" } as const;

export const collapsibleSchema = {
  variant: { values: ["outline", "soft", "ghost"], defaultValue: "outline" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const collapsibleParts = [
  { export: "Collapsible", file: "collapsible", contract: "CollapsibleRootProps" },
  { export: "CollapsibleTrigger", file: "trigger", contract: "CollapsibleTriggerProps" },
  { export: "CollapsibleIndicator", file: "indicator", contract: null },
  { export: "CollapsibleContent", file: "content", contract: null },
] as const satisfies readonly ComponentPart[];

export const collapsibleVariantData = {
  root: {
    outline: "overflow-hidden rounded-lg bg-default ring ring-default ring-inset",
    soft: "overflow-hidden rounded-lg bg-muted",
    ghost: "",
  },
  trigger: {
    outline: "text-highlighted hover:bg-muted",
    soft: "text-highlighted hover:bg-accented/60",
    ghost: "text-toned hover:text-highlighted",
  },
  content: {
    outline: "border-t border-default",
    soft: "border-t border-accented/50",
    ghost: "border-t border-muted",
  },
} as const satisfies Record<string, Record<CollapsibleVariant, string>>;

export const collapsibleSizeData = {
  trigger: {
    sm: "min-h-9 px-3 text-sm",
    md: "min-h-11 px-4 text-sm",
    lg: "min-h-13 px-5 text-base",
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
    sm: "p-3 text-sm/6",
    md: "p-4 text-sm/6",
    lg: "p-5 text-base/7",
  },
} as const satisfies Record<string, Record<CollapsibleSize, string>>;

/**
 * Everything the Collapsible root accepts in both frameworks.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 */
export interface CollapsibleRootProps {
  variant?: CollapsibleVariant;
  size?: CollapsibleSize;
  disabled?: boolean;
  /**
   * How much of the panel stays visible while closed, as a CSS length or a number of
   * pixels. Turns the component into a "show more": the panel is clipped rather than
   * hidden, and the content underneath keeps its place in the tab order.
   */
  collapsedHeight?: string | number;
  /** Remove the panel from the DOM once it has finished closing. */
  unmountOnExit?: boolean;
  /** Keep the panel out of the DOM until it is opened for the first time. */
  lazyMount?: boolean;
}

/**
 * Everything a Collapsible trigger accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface CollapsibleTriggerProps<F> {
  /** Icon shown before the label. */
  leadingIcon?: F;
  /** Replaces the chevron. */
  trailingIcon?: F;
}
