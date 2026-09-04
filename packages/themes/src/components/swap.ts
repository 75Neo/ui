import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Swap: one icon shown while on, another while off.
 *
 * @remarks
 * Which icon the reader sees is chosen by presence, not by the adapter. Ark hides the
 * other indicator behind the `hidden` attribute, so one resolved class string covers
 * both states and the component never re-resolves when it flips — the same arrangement
 * the Switch uses for its thumb icons, with `on` and `off` where the Switch says
 * `checked` and `unchecked`.
 *
 * There is no `color` variant. A swap borrows its meaning from whatever it sits in —
 * the play button around it, the row it toggles — so it paints nothing of its own.
 */
export const swap = tv({
  slots: {
    base: "inline-flex shrink-0 items-center justify-center",
    onIcon: "shrink-0 [&>svg]:size-full",
    offIcon: "shrink-0 [&>svg]:size-full",
  },
  variants: {
    size: {
      sm: {
        onIcon: "size-4",
        offIcon: "size-4",
      },
      md: {
        onIcon: "size-5",
        offIcon: "size-5",
      },
      lg: {
        onIcon: "size-6",
        offIcon: "size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SwapVariants = VariantProps<typeof swap>;
export type SwapSlots = keyof ReturnType<typeof swap>;

export type SwapUI = TVSlot<SwapSlots>;

export type SwapTheme = ThemeOverride<SwapSlots, SwapVariants>;

/**
 * Everything a Swap accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The state is display-only: nothing inside a swap flips it, so `swap` is a plain prop
 * in both adapters rather than a model, and there is no change event to spell
 * differently.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface SwapProps<F> {
  /** Per-slot class overrides. */
  ui?: SwapUI;
  size?: SwapVariants["size"];
  /** Whether the swap shows its `on` icon. */
  swap?: boolean;
  /** Icon shown while on. */
  onIcon?: F;
  /** Icon shown while off. */
  offIcon?: F;
  /** Keep the hidden icon out of the DOM until it is shown for the first time. */
  lazyMount?: boolean;
  /** Remove the hidden icon from the DOM once it has finished hiding. */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SwapVariantsAreExposed = MustBeNever<
  Exclude<keyof SwapVariants, keyof SwapProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    swap: ComponentContract<SwapSlots, SwapVariants>;
  }
}
