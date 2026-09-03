import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Dialog: a panel over the page, and the overlay behind it.
 *
 * @remarks
 * `base` is the panel, not a root element. Ark's `Dialog.Root` renders nothing at all —
 * it is a context provider — so this is the first component in the library where the
 * root slot and the root element come apart. The panel is the only defensible target
 * for a call-site `class`, because "style this dialog" means the box the reader is
 * looking at. Every portalled component that follows should read `base` the same way:
 * the root element when Ark renders one, the panel when it does not.
 *
 * Note that `data-slot="base"` is therefore not unique on the page — every component's
 * root slot carries it, so a Button inside a dialog has one too. Anything selecting the
 * panel should use Ark's own `[data-scope="dialog"][data-part="content"]`.
 *
 * There is no `color` variant. A dialog is a surface, and the library spends a hue on
 * things that carry meaning; the buttons inside it carry the meaning instead. This is
 * the first recipe whose color half is empty and where `byColor` goes unused.
 *
 * The motion is the shared `overlay-*` and `panel-*` pair from `src/tokens/keyframes.css`,
 * and it is a variant rather than a fixed class so a caller can turn it off. Enter and
 * exit name different keyframes because Ark decides how long to hold the panel mounted
 * by sampling the closed state's animation name, and a name matching the open one makes
 * it unmount at once — skipping the exit with no error to show for it.
 *
 * The panel scrolls its body, not itself: `base` is capped and hides its overflow, and
 * `body` takes the remaining height and scrolls. That keeps the header and the footer
 * pinned while a long body moves under them, which is what a dialog with a form in it
 * needs and what a single scrolling box cannot do.
 */
export const dialog = tv({
  slots: {
    overlay: "fixed inset-0 bg-inverted/40 backdrop-blur-[2px]",
    positioner: "fixed inset-0 flex items-center justify-center",
    base: "relative flex w-full flex-col overflow-hidden bg-default outline-none",
    header: "flex shrink-0 items-start gap-3 border-b border-muted",
    wrapper: "flex min-w-0 flex-1 flex-col gap-1",
    title: "font-semibold text-highlighted",
    description: "text-muted",
    body: "min-h-0 flex-1 overflow-y-auto overscroll-contain text-toned",
    footer:
      "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40",
    closeTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
  },
  variants: {
    size: {
      sm: {
        base: "max-w-sm",
        header: "px-4 py-3",
        title: "text-sm",
        description: "text-xs/5",
        body: "px-4 py-3 text-sm/6",
        footer: "px-4 py-3",
        closeTrigger: "size-6 p-1",
      },
      md: {
        base: "max-w-md",
        header: "px-5 py-4",
        title: "text-base",
        description: "text-sm/6",
        body: "px-5 py-4 text-sm/6",
        footer: "px-5 py-4",
        closeTrigger: "size-7 p-1.5",
      },
      lg: {
        base: "max-w-2xl",
        header: "px-6 py-5",
        title: "text-lg",
        description: "text-sm/6",
        body: "px-6 py-5 text-base/7",
        footer: "px-6 py-5",
        closeTrigger: "size-8 p-1.5",
      },
      xl: {
        base: "max-w-4xl",
        header: "px-6 py-5",
        title: "text-xl",
        description: "text-base/6",
        body: "px-6 py-5 text-base/7",
        footer: "px-6 py-5",
        closeTrigger: "size-8 p-1.5",
      },
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
    /** Fills the viewport instead of sitting in the middle of it. */
    fullscreen: {
      true: {
        positioner: "p-0",
        base: "h-dvh max-h-dvh max-w-none rounded-none",
      },
      false: {
        positioner: "p-4",
        base: "max-h-[calc(100dvh-2rem)] rounded-xl shadow-2xl ring ring-accented",
      },
    },
  },
  defaultVariants: {
    size: "md",
    transition: true,
    fullscreen: false,
  },
});

export type DialogVariants = VariantProps<typeof dialog>;
export type DialogSlots = keyof ReturnType<typeof dialog>;

export type DialogUI = TVSlot<DialogSlots>;

export type DialogTheme = ThemeOverride<DialogSlots, DialogVariants>;

/**
 * Everything a Dialog accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The caller's own content is not here, and where each piece goes is the rule this
 * component sets for every component after it. **The default slot is the trigger** —
 * the one element the caller owns that lives outside the panel — and everything inside
 * the panel is addressed by name, because the recipe positions all of it. So a header,
 * a body and a footer are named, and `children` in React or the default slot in Vue is
 * the button that opens the thing.
 *
 * That is the shape Nuxt UI's `Modal` uses, and it is worth stating why it beats the
 * obvious alternative of making the body the default slot: a dialog's trigger is the
 * only part a caller must be able to hand over as their own element, because it has to
 * be a real themed `Button` carrying Ark's props. Reserving the default slot for it
 * means no component in the library ever needs a `trigger` prop that takes markup.
 *
 * The open state is not here either: React spells it `open` with `onOpenChange`, Vue
 * spells it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface DialogProps<F> {
  /** Per-slot class overrides. */
  ui?: DialogUI;
  size?: DialogVariants["size"];
  transition?: DialogVariants["transition"];
  fullscreen?: DialogVariants["fullscreen"];
  /** Header title. Also names the panel for a screen reader. */
  title?: string;
  /** Header text under the title. */
  description?: string;
  /** Draw the overlay behind the panel. @defaultValue `true` */
  overlay?: boolean;
  /**
   * Close on Escape and on a click outside the panel. Turning it off leaves the close
   * button and the caller's own controls as the only ways out, which is what a dialog
   * asking to confirm something destructive wants.
   *
   * @defaultValue `true`
   */
  dismissible?: boolean;
  /** Show the close button in the header. @defaultValue `true` */
  close?: boolean;
  /** Replaces the close button's icon. */
  closeIcon?: F;
  /** Whether the rest of the page is inert while the dialog is open. @defaultValue `true` */
  modal?: boolean;
  /** `"alertdialog"` tells a screen reader the dialog interrupts. @defaultValue `"dialog"` */
  role?: "dialog" | "alertdialog";
  /** Move the panel to the end of the document. @defaultValue `true` */
  portal?: boolean;
  /** Keep the panel out of the DOM until it is opened for the first time. */
  lazyMount?: boolean;
  /** Remove the panel from the DOM once it has finished closing. */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type DialogVariantsAreExposed = MustBeNever<
  Exclude<keyof DialogVariants, keyof DialogProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    dialog: ComponentContract<DialogSlots, DialogVariants>;
  }
}
