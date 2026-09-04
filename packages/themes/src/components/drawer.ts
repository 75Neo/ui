import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Drawer: a dialog anchored to one edge of the viewport.
 *
 * @remarks
 * It is the Dialog's anatomy on a different geometry. The slots are the Dialog's —
 * the overlay behind the panel, the panel itself as `base`, and a header, a scrolling
 * body and a footer inside it — so a `ui` override written for one reads on the other.
 * Like the Dialog, `base` is the panel rather than a root element, because Ark's
 * `Drawer.Root` renders nothing at all.
 *
 * The motion is the Dialog's too, and deliberately so: everything that appears over
 * the page fades and scales by the same amounts. The panel-in/out keyframes are in
 * `src/tokens/keyframes.css`, and enter and exit name different keyframes because Ark
 * decides how long to hold the panel mounted by sampling the closed state's animation
 * name.
 *
 * `placement` reads `left` and `right` in the reading direction, because Ark's own
 * `swipeDirection` is logical — it knows `start` and `end` but no left and right — and
 * the adapter maps one onto the other. The rounding follows the same direction, so
 * the corners facing the viewport stay round whichever way the page reads.
 *
 * `size` is a width on a side drawer and a height on a top or bottom one, which is
 * why it resolves through compound variants rather than naming its classes outright.
 * There is no `color` variant: a drawer is a surface, and the buttons inside it carry
 * the meaning instead.
 */
export const drawer = tv({
  slots: {
    overlay: "fixed inset-0 bg-inverted/40 backdrop-blur-[2px]",
    positioner: "fixed inset-0 flex",
    base: "relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-default shadow-2xl ring ring-accented outline-none",
    header: "flex shrink-0 items-start gap-3 border-b border-muted px-5 py-4",
    wrapper: "flex min-w-0 flex-1 flex-col gap-1",
    title: "text-base font-semibold text-highlighted",
    description: "text-sm/6 text-muted",
    body: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-sm/6 text-toned",
    footer:
      "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40 px-5 py-4",
    closeTrigger:
      "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
  },
  variants: {
    placement: {
      left: {
        positioner: "items-stretch justify-start",
        base: "h-dvh rounded-e-2xl",
      },
      right: {
        positioner: "items-stretch justify-end",
        base: "h-dvh rounded-s-2xl",
      },
      top: {
        positioner: "flex-col items-stretch justify-start",
        base: "rounded-b-2xl",
      },
      bottom: {
        positioner: "flex-col items-stretch justify-end",
        base: "rounded-t-2xl",
      },
    },
    /**
     * A width on a side drawer, a height on a top or bottom one. The maximum keeps a
     * wide drawer off the far edge on a narrow viewport.
     */
    size: {
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    /**
     * Whether the panel and the overlay animate in and out. Off leaves both mounted for
     * exactly as long as Ark needs and nothing more, which is what a caller honouring
     * `prefers-reduced-motion` at the application level wants.
     */
    transition: {
      true: {
        overlay: "data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in",
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  compoundVariants: [
    ...(
      [
        ["left", "w-72 max-w-[calc(100dvw-2rem)]"],
        ["right", "w-72 max-w-[calc(100dvw-2rem)]"],
        ["top", "h-56 max-h-[calc(100dvh-2rem)] w-full"],
        ["bottom", "h-56 max-h-[calc(100dvh-2rem)] w-full"],
      ] as const
    ).map(([placement, panel]) => ({ placement, size: "sm" as const, class: { base: panel } })),
    ...(
      [
        ["left", "w-80 max-w-[calc(100dvw-2rem)]"],
        ["right", "w-80 max-w-[calc(100dvw-2rem)]"],
        ["top", "h-72 max-h-[calc(100dvh-2rem)] w-full"],
        ["bottom", "h-72 max-h-[calc(100dvh-2rem)] w-full"],
      ] as const
    ).map(([placement, panel]) => ({ placement, size: "md" as const, class: { base: panel } })),
    ...(
      [
        ["left", "w-96 max-w-[calc(100dvw-2rem)]"],
        ["right", "w-96 max-w-[calc(100dvw-2rem)]"],
        ["top", "h-96 max-h-[calc(100dvh-2rem)] w-full"],
        ["bottom", "h-96 max-h-[calc(100dvh-2rem)] w-full"],
      ] as const
    ).map(([placement, panel]) => ({ placement, size: "lg" as const, class: { base: panel } })),
    ...(
      [
        ["left", "w-[28rem] max-w-[calc(100dvw-2rem)]"],
        ["right", "w-[28rem] max-w-[calc(100dvw-2rem)]"],
        ["top", "h-[32rem] max-h-[calc(100dvh-2rem)] w-full"],
        ["bottom", "h-[32rem] max-h-[calc(100dvh-2rem)] w-full"],
      ] as const
    ).map(([placement, panel]) => ({ placement, size: "xl" as const, class: { base: panel } })),
  ],
  defaultVariants: {
    placement: "right",
    size: "md",
    transition: true,
  },
});

export type DrawerVariants = VariantProps<typeof drawer>;
export type DrawerSlots = keyof ReturnType<typeof drawer>;

export type DrawerUI = TVSlot<DrawerSlots>;

export type DrawerTheme = ThemeOverride<DrawerSlots, DrawerVariants>;

/**
 * Everything a Drawer accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The default slot is the trigger and everything inside the panel is addressed by
 * name, which is the rule the Dialog settled for every component carrying the
 * caller's own content.
 *
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead. The swipe
 * direction is not here either: it follows `placement`, because Ark's own vocabulary
 * is logical and the adapter maps one onto the other.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface DrawerProps<F> {
  /** Per-slot class overrides. */
  ui?: DrawerUI;
  /** Which edge the panel slides in from. @defaultValue `"right"` */
  placement?: DrawerVariants["placement"];
  /** A width on a side drawer, a height on a top or bottom one. */
  size?: DrawerVariants["size"];
  transition?: DrawerVariants["transition"];
  /** Header title. Also names the panel for a screen reader. */
  title?: string;
  /** Header text under the title. */
  description?: string;
  /** Draw the overlay behind the panel. @defaultValue `true` */
  overlay?: boolean;
  /**
   * Close on Escape and on a click outside the panel. Turning it off leaves the close
   * button and the caller's own controls as the only ways out.
   *
   * @defaultValue `true`
   */
  dismissible?: boolean;
  /** Show the close button in the header. @defaultValue `true` */
  close?: boolean;
  /** Replaces the close button's icon. */
  closeIcon?: F;
  /** Whether the rest of the page is inert while the drawer is open. @defaultValue `true` */
  modal?: boolean;
  /** `"alertdialog"` tells a screen reader the drawer interrupts. @defaultValue `"dialog"` */
  role?: "dialog" | "alertdialog";
  /**
   * Whether the panel drags to dismiss. Off leaves the grabber, if one is rendered,
   * as the only drag handle.
   *
   * @defaultValue `true`
   */
  draggable?: boolean;
  /** Move the panel to the end of the document. @defaultValue `true` */
  portal?: boolean;
  /** Keep the panel out of the DOM until it is opened for the first time. */
  lazyMount?: boolean;
  /** Remove the panel from the DOM once it has finished closing. */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type DrawerVariantsAreExposed = MustBeNever<
  Exclude<keyof DrawerVariants, keyof DrawerProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    drawer: ComponentContract<DrawerSlots, DrawerVariants>;
  }
}
