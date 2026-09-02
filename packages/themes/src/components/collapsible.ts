import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Collapsible: one trigger and the panel it opens.
 *
 * @remarks
 * This is Accordion's row without the accordion around it, and it wears the same
 * vocabulary on purpose — the same three variants, the same three sizes, and the same
 * slot names, so the two look like siblings on a page and a `ui` override written for
 * one reads on the other. What is different is that nothing coordinates it: there is no
 * set of rows taking turns, so no `value` and no `multiple`.
 *
 * Open is not a variant. Ark writes `data-state` on the content and the trigger, and
 * the recipe styles itself off that, so one resolved class string covers both states
 * and toggling never re-resolves.
 *
 * The rule between the trigger and the panel is the panel's own `border-t`, not
 * `divide-y` on the root. A closed panel stays in the DOM carrying `hidden`, and
 * Tailwind's divider is a border on the element before it, so it would draw a stray
 * line inside the bottom edge of every closed panel. A border on the panel disappears
 * with the panel, and a `collapsedHeight` — which leaves it visible — keeps it.
 *
 * The `content` slot hands Ark's two measurements to the shared keyframes in
 * `src/tokens/keyframes.css`: `--height` is the panel's natural size and
 * `--collapsed-height` is what a `collapsedHeight` asked it to shrink to, defaulting to
 * nothing. That default is why the same keyframes serve Accordion, which always closes
 * all the way shut.
 *
 * Disabled is styled with `data-disabled:`, even though the trigger is a native button.
 * Ark's Collapsible never sets the real `disabled` attribute — it writes `data-disabled`
 * and guards the click handler itself — where Accordion's trigger does set it. The
 * spelling is per component, not per element, and picking the wrong one leaves a
 * disabled panel looking enabled.
 */
export const collapsible = tv({
  slots: {
    base: "flex min-w-0 flex-col",
    trigger:
      "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 data-disabled:cursor-not-allowed data-disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    label: "min-w-0 flex-1 truncate",
    trailingIcon:
      "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
    content:
      "overflow-hidden [--ui-collapsible-collapsed-height:var(--collapsed-height,0px)] [--ui-collapsible-height:var(--height)] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
    body: "min-w-0 text-pretty text-toned",
  },
  variants: {
    variant: {
      outline: {
        base: "overflow-hidden rounded-lg bg-default ring ring-default ring-inset",
        trigger: "text-highlighted hover:bg-muted",
        content: "border-t border-default",
      },
      soft: {
        base: "overflow-hidden rounded-lg bg-muted",
        trigger: "text-highlighted hover:bg-accented/60",
        content: "border-t border-accented/50",
      },
      ghost: {
        trigger: "text-toned hover:text-highlighted",
        content: "border-t border-muted",
      },
    },
    size: {
      sm: {
        trigger: "min-h-9 px-3 text-sm",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
        body: "p-3 text-sm/6",
      },
      md: {
        trigger: "min-h-11 px-4 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
        body: "p-4 text-sm/6",
      },
      lg: {
        trigger: "min-h-13 px-5 text-base",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
        body: "p-5 text-base/7",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

export type CollapsibleVariants = VariantProps<typeof collapsible>;
export type CollapsibleSlots = keyof ReturnType<typeof collapsible>;

export type CollapsibleUI = TVSlot<CollapsibleSlots>;

export type CollapsibleTheme = ThemeOverride<CollapsibleSlots, CollapsibleVariants>;

/**
 * Everything a Collapsible accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The panel's own content is not here. It is whatever the framework calls children —
 * `children` in React, the default slot in Vue — because a collapsible usually holds
 * markup rather than a sentence, and a string prop would only get in the way.
 *
 * The open state is not here either: React spells it `open` with `onOpenChange`, Vue
 * spells it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface CollapsibleProps<F> {
  /** Per-slot class overrides. */
  ui?: CollapsibleUI;
  variant?: CollapsibleVariants["variant"];
  size?: CollapsibleVariants["size"];
  /** Trigger text. */
  label?: string;
  /** Icon shown before the label. */
  icon?: F;
  /** Replaces the chevron. */
  trailingIcon?: F;
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

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type CollapsibleVariantsAreExposed = MustBeNever<
  Exclude<keyof CollapsibleVariants, keyof CollapsibleProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    collapsible: ComponentContract<CollapsibleSlots, CollapsibleVariants>;
  }
}
