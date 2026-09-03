import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import type { Placement } from "../placement";

/**
 * Recipe for the Popover: a panel anchored to the thing that opened it.
 *
 * @remarks
 * It is the Dialog's anatomy on the Tooltip's geometry. The panel is `base` and holds a
 * title, a description and a body, exactly as the Dialog's does; where it sits, how it
 * moves and how its arrow is drawn are the Tooltip's, down to reading
 * `--transform-origin` off the positioner so one pair of keyframes reads correctly from
 * all twelve placements.
 *
 * The close button is absolutely positioned rather than sharing a row with the title,
 * which is the one place this parts company with the Dialog. A popover is small and
 * often has no title at all, and a header row that collapses to just a button reads as
 * an empty bar.
 *
 * `base` sets a width rather than a maximum. A popover is anchored to something narrow,
 * so left to `max-width` it would shrink to its content and land in a different place
 * for every string it holds.
 *
 * The arrow tip carries no ring, unlike the panel it points out of. A rotated square
 * outlined on all four sides draws two of them inside the panel, and which two depends
 * on the placement, so the honest options were a solid tip or a compound row per side.
 */
export const popover = tv({
  slots: {
    positioner: "z-50",
    base: "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]",
    arrowTip: "",
    title: "font-semibold text-highlighted",
    description: "text-muted",
    body: "min-w-0 text-toned",
    closeTrigger:
      "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  },
  variants: {
    size: {
      sm: {
        base: "w-56 gap-1 p-3",
        title: "text-sm",
        description: "text-xs/5",
        body: "text-sm/6",
        closeTrigger: "size-6 p-1",
      },
      md: {
        base: "w-72 gap-1 p-4",
        title: "text-sm",
        description: "text-sm/6",
        body: "text-sm/6",
        closeTrigger: "size-7 p-1.5",
      },
      lg: {
        base: "w-96 gap-1.5 p-5",
        title: "text-base",
        description: "text-sm/6",
        body: "text-base/7",
        closeTrigger: "size-8 p-1.5",
      },
    },
    /**
     * Whether room is kept for the close button.
     *
     * @remarks
     * The button is positioned over the panel rather than sharing a row, so nothing
     * else moves out of its way on its own and a title would run underneath it. One
     * padding covers all three sizes: the button grows with the size and so does the
     * panel's own padding, and the difference between them stays the same.
     */
    close: {
      true: { title: "pe-6", description: "pe-6" },
      false: {},
    },
    /** Off is for a caller who would rather animate the panel themselves. */
    transition: {
      true: {
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "md",
    close: false,
    transition: true,
  },
});

export type PopoverVariants = VariantProps<typeof popover>;
export type PopoverSlots = keyof ReturnType<typeof popover>;

export type PopoverUI = TVSlot<PopoverSlots>;

export type PopoverTheme = ThemeOverride<PopoverSlots, PopoverVariants>;

/**
 * Everything a Popover accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells it
 * `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`, and the
 * panel's parts are named. That is the rule for every component carrying the caller's
 * own content, and the Dialog is where it was settled.
 */
export interface PopoverProps<F> {
  /** Per-slot class overrides. */
  ui?: PopoverUI;
  size?: PopoverVariants["size"];
  transition?: PopoverVariants["transition"];
  /** A heading at the top of the panel, which also labels it for a screen reader. */
  title?: string;
  /** A quieter line under the title. */
  description?: string;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the panel prefers. @defaultValue `"bottom"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the panel. @defaultValue `8` */
  offset?: number;
  /**
   * Whether Escape and a click outside close the panel.
   *
   * @defaultValue `true`
   */
  dismissible?: boolean;
  /** Trap focus, block scrolling, and hide the rest of the page. @defaultValue `false` */
  modal?: boolean;
  /** Show a close button in the panel's top corner. @defaultValue `false` */
  close?: boolean;
  /** Replaces the close button's cross. */
  closeIcon?: F;
  /** Move focus into the panel when it opens. @defaultValue `true` */
  autoFocus?: boolean;
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the panel. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the panel again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type PopoverVariantsAreExposed = MustBeNever<
  Exclude<keyof PopoverVariants, keyof PopoverProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    popover: ComponentContract<PopoverSlots, PopoverVariants>;
  }
}
