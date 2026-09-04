import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Where a toast sits on the screen.
 *
 * @remarks
 * Written out rather than imported from Ark, because Vue's `defineProps` resolves
 * types from source and cannot follow one into a dependency's declaration files. It
 * lives here rather than in `placement.ts` because it is not one of the twelve popper
 * placements: a toast docks to a corner of the viewport, never to an element.
 */
export type ToastPlacement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end";

/**
 * The kind of toast being shown.
 *
 * @remarks
 * Ark's own type is wider — any string is accepted — but these five are the ones with
 * styling behind them. Anything else renders with the neutral look.
 */
export type ToastType = "success" | "error" | "warning" | "info" | "loading";

/**
 * Recipe for the Toast: a message over the page, and the group holding every live one.
 *
 * @remarks
 * `base` is the toast, not the group. Ark's `Toaster` renders the positioned group and
 * the store positions it with inline styles, so the group needs nothing but a width
 * and `base` is the only defensible target for a call-site `class`.
 *
 * The root carries the positioning variables Ark measures at runtime — `--x`, `--y`,
 * `--scale`, `--z-index`, `--height` and `--opacity` — as arbitrary properties, with
 * the open and closed transitions from Ark's own styling notes. Without them stacked
 * toasts never overlap and exiting ones snap out instead of shrinking away.
 *
 * The toast's kind is not a variant. Ark writes `data-type` on the root, so one
 * resolved class string covers all five kinds and the soft tint behind each one is a
 * literal selector rather than an interpolated class. The `color` variant is the
 * accent on top of that: it reaches the action button only, the way the Clipboard's
 * reaches its trigger. The two never meet on one property, so they never conflict.
 *
 * `placement` is a variant for one reason: a toast that scales should grow out of the
 * edge it arrived from, so each corner names its own transform origin. The store owns
 * the actual position, and the prop default matches its default, so the two agree
 * unless a caller sets them apart on purpose.
 */
export const toast = tv({
  slots: {
    group: "w-88 max-w-[calc(100vw-2rem)]",
    base: "relative z-(--z-index) flex h-(--height) w-full [translate:var(--x)_var(--y)] scale-(--scale) flex-col overflow-hidden rounded-xl bg-default opacity-(--opacity) shadow-lg ring ring-accented [transition-timing-function:cubic-bezier(0.21,1.02,0.73,1)] will-change-[translate,opacity,scale] [transition:translate_400ms,scale_400ms,opacity_400ms,height_400ms,box-shadow_200ms] data-[state=closed]:[transition:translate_400ms,scale_400ms,opacity_200ms] data-[type=error]:bg-error/10 data-[type=error]:ring-error/50 data-[type=info]:bg-info/10 data-[type=info]:ring-info/50 data-[type=success]:bg-success/10 data-[type=success]:ring-success/50 data-[type=warning]:bg-warning/10 data-[type=warning]:ring-warning/50",
    title: "flex items-center gap-2 font-semibold text-highlighted",
    description: "text-muted",
    leadingIcon:
      "shrink-0 text-dimmed data-[type=error]:text-error data-[type=info]:text-info data-[type=loading]:animate-spin data-[type=success]:text-success data-[type=warning]:text-warning [&>svg]:size-full",
    actionTrigger:
      "inline-flex cursor-pointer items-center justify-center self-start rounded-md font-medium transition-colors focus-visible:outline-3",
    closeTrigger:
      "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      sm: {
        base: "gap-1 p-3 pe-9",
        title: "text-sm",
        description: "text-xs",
        leadingIcon: "size-4",
        actionTrigger: "mt-1 h-7 px-2.5 text-xs",
        closeTrigger: "size-6 p-1",
      },
      md: {
        base: "gap-1 p-4 pe-10",
        title: "text-sm",
        description: "text-sm",
        leadingIcon: "size-5",
        actionTrigger: "mt-1.5 h-8 px-3 text-sm",
        closeTrigger: "size-7 p-1.5",
      },
      lg: {
        base: "gap-1.5 p-5 pe-12",
        title: "text-base",
        description: "text-sm",
        leadingIcon: "size-5",
        actionTrigger: "mt-2 h-9 px-3.5 text-sm",
        closeTrigger: "size-8 p-1.5",
      },
    },
    placement: {
      "top-start": { base: "origin-top-left" },
      top: { base: "origin-top" },
      "top-end": { base: "origin-top-right" },
      "bottom-start": { base: "origin-bottom-left" },
      bottom: { base: "origin-bottom" },
      "bottom-end": { base: "origin-bottom-right" },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        actionTrigger: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
      },
    })),
    {
      color: "neutral",
      class: {
        actionTrigger:
          "text-muted outline-inverted/25 hover:bg-elevated hover:text-default active:bg-elevated",
      },
    },
  ],
  defaultVariants: {
    color: "neutral",
    size: "md",
    placement: "bottom",
  },
});

export type ToastVariants = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export type ToastUI = TVSlot<ToastSlots>;

export type ToastTheme = ThemeOverride<ToastSlots, ToastVariants>;

/**
 * Everything a Toast accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The toasts themselves are not here: the caller owns the store — built with the
 * `createToaster` each adapter re-exports — and passes it in, because only the caller
 * knows when a toast should appear. The component renders the group and every live
 * toast in it, with the title, description and action read off each toast's own data.
 *
 * The `placement` here should match the store's, which is also `"bottom"` unless
 * told otherwise. Only the side matters — every `bottom-*` store agrees with every
 * `bottom-*` prop — because the variant only picks the transform origin.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ToastProps<F> {
  /** Per-slot class overrides. */
  ui?: ToastUI;
  color?: ToastVariants["color"];
  size?: ToastVariants["size"];
  placement?: ToastPlacement;
  /** Replaces the close button's cross. */
  closeIcon?: F;
  /** Replaces the icon drawn per toast kind. Falls back to a lucide icon per kind. */
  icons?: Partial<Record<ToastType, F>>;
  /** Render the group at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ToastVariantsAreExposed = MustBeNever<
  Exclude<keyof ToastVariants, keyof ToastProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    toast: ComponentContract<ToastSlots, ToastVariants>;
  }
}
