import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Accordion: a stack of collapsible rows.
 *
 * @remarks
 * Orientation is not a variant. Every slot styles itself off the `data-orientation`
 * attribute Ark sets, which keeps the variant matrix at nine combinations rather than
 * twenty-seven. The `content` slot hands Ark's measured size to the open and close
 * keyframes in `src/tokens/keyframes.css`.
 */
export const accordion = tv({
  slots: {
    base: "group/accordion flex min-w-0 flex-col data-[orientation=horizontal]:h-full data-[orientation=horizontal]:flex-row",
    item: "min-w-0 [overflow-anchor:none] group-data-[orientation=horizontal]/accordion:flex",
    header:
      "flex min-w-0 group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:shrink-0",
    trigger:
      "flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 text-start font-medium transition-[color,background-color,border-color,box-shadow] duration-150 outline-none select-none group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:w-auto group-data-[orientation=horizontal]/accordion:[writing-mode:vertical-rl] focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset data-disabled:pointer-events-none data-disabled:opacity-50",
    label: "min-w-0 flex-1 truncate group-data-[orientation=horizontal]/accordion:min-h-0",
    indicator:
      "shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
    content:
      "overflow-hidden [--ui-collapsible-height:var(--height)] [--ui-collapsible-width:var(--width)] group-data-[orientation=horizontal]/accordion:h-full data-[state=closed]:animate-accordion-up group-data-[orientation=horizontal]/accordion:data-[state=closed]:animate-accordion-left data-[state=open]:animate-accordion-down group-data-[orientation=horizontal]/accordion:data-[state=open]:animate-accordion-right",
    body: "min-w-0 text-pretty text-muted group-data-[orientation=horizontal]/accordion:w-max group-data-[orientation=horizontal]/accordion:max-w-sm",
  },
  variants: {
    variant: {
      outline: {
        base: "divide-y divide-default overflow-hidden rounded-lg border border-default data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
        item: "bg-default",
        trigger: "text-highlighted hover:bg-muted",
      },
      soft: {
        base: "gap-2",
        item: "overflow-hidden rounded-lg bg-muted",
        trigger: "text-highlighted hover:bg-accented",
      },
      ghost: {
        base: "divide-y divide-muted data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
        item: "bg-transparent",
        trigger: "text-default hover:text-highlighted",
      },
    },
    size: {
      sm: {
        trigger: "min-h-9 px-3 text-sm group-data-[orientation=horizontal]/accordion:min-w-9",
        indicator: "size-4",
        body: "p-3 text-sm/6",
      },
      md: {
        trigger: "min-h-11 px-4 text-sm group-data-[orientation=horizontal]/accordion:min-w-11",
        indicator: "size-4",
        body: "p-4 text-sm/6",
      },
      lg: {
        trigger: "min-h-13 px-5 text-base group-data-[orientation=horizontal]/accordion:min-w-13",
        indicator: "size-5",
        body: "p-5 text-base/7",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

export type AccordionVariants = VariantProps<typeof accordion>;
export type AccordionSlots = keyof ReturnType<typeof accordion>;

export type AccordionUI = TVSlot<AccordionSlots>;

export type AccordionTheme = ThemeOverride<AccordionSlots, AccordionVariants>;

/**
 * One row of the accordion.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The text is plain strings, which keeps an item serializable. For richer markup use
 * the adapter's escape hatch: render props in React, scoped slots in Vue.
 */
export interface AccordionItem<F> {
  /** Identifies the row. Pass it to `defaultValue` to open the row up front. */
  value: string;
  /** Heading text. */
  label: string;
  /** Body text, shown while the row is open. */
  content: string;
  disabled?: boolean;
  /** Replaces the shared indicator icon on this row alone. */
  icon?: F;
}

/**
 * Everything an Accordion accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface AccordionProps<F> {
  /** Per-slot class overrides. */
  ui?: AccordionUI;
  variant?: AccordionVariants["variant"];
  size?: AccordionVariants["size"];
  /** The rows to render, in order. */
  items: AccordionItem<F>[];
  /** Allow more than one row open at a time. */
  multiple?: boolean;
  /** Allow closing the open row, leaving none open. */
  collapsible?: boolean;
  /** Disable every row. */
  disabled?: boolean;
  /** @defaultValue `"vertical"` */
  orientation?: "horizontal" | "vertical";
  /** Replaces the chevron on every row. */
  indicatorIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type AccordionVariantsAreExposed = MustBeNever<
  Exclude<keyof AccordionVariants, keyof AccordionProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    accordion: ComponentContract<AccordionSlots, AccordionVariants>;
  }
}
