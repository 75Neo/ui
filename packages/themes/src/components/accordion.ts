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
 *
 * The icon slots are named for their position rather than their job, matching Button,
 * so `ui.trailingIcon` means the same thing on both components. `leadingIcon` is the
 * per-row icon; `trailingIcon` is the chevron.
 *
 * Disabled is styled off the trigger's own `disabled` attribute rather than declared as
 * a variant, because one row can be disabled while the accordion around it is not, and
 * a variant resolves once for the whole component. Ark renders the trigger as a native
 * button and sets `disabled` on it, not `data-disabled`.
 */
export const accordion = tv({
  slots: {
    base: "group/accordion flex min-w-0 flex-col data-[orientation=horizontal]:h-full data-[orientation=horizontal]:flex-row",
    item: "min-w-0 [overflow-anchor:none] group-data-[orientation=horizontal]/accordion:flex",
    header:
      "flex min-w-0 group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:shrink-0",
    trigger:
      "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:w-auto group-data-[orientation=horizontal]/accordion:[writing-mode:vertical-rl] focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 disabled:cursor-not-allowed disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    label: "min-w-0 flex-1 truncate group-data-[orientation=horizontal]/accordion:min-h-0",
    trailingIcon:
      "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
    content:
      "overflow-hidden [--ui-collapsible-height:var(--height)] [--ui-collapsible-width:var(--width)] group-data-[orientation=horizontal]/accordion:h-full data-[state=closed]:animate-collapsible-up group-data-[orientation=horizontal]/accordion:data-[state=closed]:animate-collapsible-left data-[state=open]:animate-collapsible-down group-data-[orientation=horizontal]/accordion:data-[state=open]:animate-collapsible-right",
    body: "min-w-0 text-pretty text-toned group-data-[orientation=horizontal]/accordion:w-max group-data-[orientation=horizontal]/accordion:max-w-sm",
  },
  variants: {
    variant: {
      outline: {
        base: "divide-y divide-default overflow-hidden rounded-lg ring ring-default ring-inset data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
        item: "bg-default",
        trigger: "text-highlighted hover:bg-muted",
      },
      soft: {
        base: "gap-2",
        item: "overflow-hidden rounded-lg bg-muted",
        trigger: "text-highlighted hover:bg-accented/60",
      },
      ghost: {
        base: "divide-y divide-muted data-[orientation=horizontal]:divide-x data-[orientation=horizontal]:divide-y-0",
        item: "bg-transparent",
        trigger: "text-toned hover:text-highlighted",
      },
    },
    size: {
      sm: {
        trigger: "min-h-9 px-3 text-sm group-data-[orientation=horizontal]/accordion:min-w-9",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
        body: "px-3 pb-3 text-sm/6",
      },
      md: {
        trigger: "min-h-11 px-4 text-sm group-data-[orientation=horizontal]/accordion:min-w-11",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
        body: "px-4 pb-4 text-sm/6",
      },
      lg: {
        trigger: "min-h-13 px-5 text-base group-data-[orientation=horizontal]/accordion:min-w-13",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
        body: "px-5 pb-5 text-base/7",
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
  /** Icon shown before this row's label. */
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
  trailingIcon?: F;
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
