import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Tour: a spotlight onboarding flow over the page.
 *
 * @remarks
 * It is the Dialog's panel on the Popover's geometry. The panel is `base` holding a
 * title, a description and an actions row, exactly as the Popover's does; where it
 * sits and how its arrow is drawn are the Popover's too, down to reading
 * `--transform-origin` off the positioner. The overlay and the motion are the
 * Dialog's: `overlay-*` and `panel-*` from `src/tokens/keyframes.css`.
 *
 * `base` is the panel, not a root element, for the same reason it is on the Dialog:
 * Ark's `Tour.Root` renders nothing itself, so the panel is the only defensible
 * target for a call-site `class`.
 *
 * There is no `color` variant. A tour is a surface, and the library spends a hue on
 * things that carry meaning; the action buttons borrow `primary` the way links do,
 * as a fixed decision rather than a choice the caller makes per tour.
 *
 * The backdrop and the spotlight carry no position of their own. Ark writes the
 * geometry inline — the backdrop's clip path around the target, the spotlight's box
 * off `--spotlight-*` — and the recipe only paints them.
 *
 * The close button, the arrow, the backdrop and the spotlight are plain props rather
 * than variants, because the adapters read them to decide what to render at all. A
 * variant the theme could flip under the adapter would show a button the recipe had
 * no room for, which is why the Dialog's `overlay` and `close` are plain props too.
 */
export const tour = tv({
  slots: {
    backdrop: "bg-inverted/40 backdrop-blur-[2px]",
    spotlight: "ring-2 ring-primary ring-offset-2 ring-offset-bg transition-all duration-200",
    positioner: "z-50",
    base: "relative flex origin-(--transform-origin) flex-col gap-1 rounded-xl bg-default shadow-lg ring ring-accented outline-none",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]",
    arrowTip: "",
    progressText: "text-xs font-medium text-dimmed",
    title: "font-semibold text-highlighted",
    description: "text-muted",
    control: "mt-2 flex items-center justify-end gap-2",
    actionTrigger:
      "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-inverted transition-colors outline-none hover:bg-primary/75 focus-visible:outline-3 focus-visible:outline-primary/25 disabled:cursor-not-allowed disabled:opacity-75",
    closeTrigger:
      "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  },
  variants: {
    size: {
      sm: {
        base: "w-56 p-3",
        title: "text-sm",
        description: "text-xs/5",
        closeTrigger: "size-6 p-1",
      },
      md: {
        base: "w-72 p-4",
        title: "text-sm",
        description: "text-sm/6",
        closeTrigger: "size-7 p-1.5",
      },
      lg: {
        base: "w-96 p-5",
        title: "text-base",
        description: "text-sm/6",
        closeTrigger: "size-8 p-1.5",
      },
    },
    /**
     * Whether room is kept for the close button. The button sits over the panel
     * rather than sharing a row, so a title would run underneath it — the Popover's
     * arrangement, and for the same reason.
     */
    close: {
      true: { title: "pe-6", description: "pe-6" },
      false: {},
    },
    /** Off is for a caller who would rather animate the panel themselves. */
    transition: {
      true: {
        backdrop: "data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in",
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "md",
    close: true,
    transition: true,
  },
});

export type TourVariants = VariantProps<typeof tour>;
export type TourSlots = keyof ReturnType<typeof tour>;

export type TourUI = TVSlot<TourSlots>;

export type TourTheme = ThemeOverride<TourSlots, TourVariants>;

/**
 * Everything a Tour accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The tour itself — the steps, the current position, `start()` — is not here. Each
 * adapter takes Ark's tour object as its own prop, because React and Vue hold it too
 * differently to share one type, and the caller builds it with Ark's `useTour`.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface TourProps<F> {
  /** Per-slot class overrides. */
  ui?: TourUI;
  size?: TourVariants["size"];
  transition?: TourVariants["transition"];
  /** Point a small triangle back at the step's target. @defaultValue `true` */
  arrow?: boolean;
  /** Draw the overlay behind the panel. @defaultValue `true` */
  backdrop?: boolean;
  /** Draw the ring around the step's target. @defaultValue `true` */
  spotlight?: boolean;
  /** Show a close button in the panel's top corner. @defaultValue `true` */
  close?: boolean;
  /** Replaces the close button's cross. */
  closeIcon?: F;
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until the tour starts to mount the panel. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the panel again once the tour ends. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TourVariantsAreExposed = MustBeNever<
  Exclude<keyof TourVariants, keyof TourProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    tour: ComponentContract<TourSlots, TourVariants>;
  }
}
