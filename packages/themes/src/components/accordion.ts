import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Orientation is styled through `data-orientation` rather than declared as a variant.
 * Ark stamps that attribute on the root and on every item part, so `base` reads its own
 * attribute and the remaining slots read the root's through the `accordion` group. That
 * keeps the variant matrix at nine combinations instead of twenty-seven, and it means
 * the slots we render ourselves -- `header` and `body`, which Ark knows nothing about --
 * respond to orientation the same way Ark's own parts do.
 *
 * `content` bridges Ark's measured `--height` / `--width` onto the repo's
 * `--ui-collapsible-height` / `--ui-collapsible-width`, which is what the keyframes in
 * `src/tokens/keyframes.css` animate against.
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
 * One row of the accordion. `F` is however the framework spells an icon: a `ReactNode`
 * in React, a `Component` in Vue.
 *
 * `label` and `content` are plain strings because that is what the great majority of
 * accordions hold. Anything richer goes through the adapters' escape hatches -- render
 * props in React, scoped slots in Vue -- which keeps this type serializable.
 */
export interface AccordionItem<F> {
  value: string;
  label: string;
  content: string;
  disabled?: boolean;
  icon?: F;
}

/**
 * Everything an Accordion accepts that is not framework-specific.
 *
 * The variant props are written out rather than derived from the recipe because
 * `@vue/compiler-sfc` resolves `defineProps` types from source alone: it cannot
 * evaluate the recipe's inferred type, so neither `VariantProps<typeof accordion>`
 * nor a mapped type over `accordion.variants` reaches Vue as finite keys.
 * `AccordionVariantsAreExposed` below closes the gap that leaves.
 */
export interface AccordionProps<F> {
  ui?: AccordionUI;
  variant?: AccordionVariants["variant"];
  size?: AccordionVariants["size"];
  items: AccordionItem<F>[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  indicatorIcon?: F;
}

/**
 * Compile-time guard: adding a variant to the recipe without adding the matching
 * prop above is a type error here rather than a prop that silently does nothing.
 */
export type AccordionVariantsAreExposed = MustBeNever<
  Exclude<keyof AccordionVariants, keyof AccordionProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    accordion: ComponentContract<AccordionSlots, AccordionVariants>;
  }
}
