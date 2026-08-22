import { tv } from "../tv";

/**
 * One theme, three frameworks. React, Vue and Svelte all render the class names this
 * produces, so accordion styling only ever changes here.
 *
 * ## Why there is an `itemBody` slot
 *
 * The open/close animation interpolates `height` between `0` and the `--height` Ark sets
 * once it has measured the panel. With `box-sizing: border-box` an element cannot be
 * shorter than its own vertical padding, so padding on the animated element leaves a
 * visible stub at the end of the collapse. `itemContent` is therefore the bare animated
 * box and `itemBody` — the element inside it — carries the padding. The framework
 * bindings render that wrapper themselves, so callers never have to know.
 *
 * ## Orientation
 *
 * Styled for Ark's default vertical orientation. `orientation="horizontal"` is a
 * different layout *and* a different animation (`--width`, sideways text) and is not
 * covered here.
 */
export const accordion = tv({
  slots: {
    root: "flex w-full flex-col",

    // An item expanding above the viewport would otherwise drag the scroll position with
    // it; the panel that opened should stay where the user clicked.
    item: "min-w-0 [overflow-anchor:none]",

    itemTrigger: [
      "flex w-full items-center justify-between",
      "cursor-pointer border-0 bg-transparent text-start font-medium leading-snug",
      "text-fg transition-colors duration-150 ease-in-out",
      // The expanded header is the one place the accordion carries its intent colour.
      "hover:text-intent-label data-[state=open]:text-intent-label",
      // Colour comes from the global `:focus-visible` rule; only the offset is local. It
      // is negative because the boxed variants clip their corners, and an outward ring on
      // a full-bleed trigger would be cut off by that clip.
      "focus-visible:-outline-offset-2",
      "disabled:cursor-not-allowed disabled:text-fg-disabled",
      "disabled:hover:bg-transparent disabled:hover:text-fg-disabled",
    ],

    itemIndicator: [
      "inline-flex shrink-0 items-center justify-center text-fg-muted",
      "transition-transform duration-200 ease-in-out motion-reduce:transition-none",
      "data-[state=open]:rotate-180 data-[state=open]:text-intent-fg",
      // Icons scale with the trigger's type ramp rather than being sized per call site.
      "[&_svg]:size-[1em]",
    ],

    itemContent: [
      // Both halves of the animation: the keyframes interpolate `height`, and this is
      // what keeps the body from spilling out while they do.
      "overflow-hidden",
      // `collapse-in`/`collapse-out` read the `--height` Ark measures onto this element.
      "data-[state=open]:animate-collapse-in data-[state=closed]:animate-collapse-out",
      "motion-reduce:animate-none",
    ],

    itemBody: "leading-relaxed text-fg-muted",
  },

  /**
   * `size` is declared before `variant` deliberately. `tailwind-variants` appends variant
   * classes in declaration order and `tailwind-merge` lets the last one win, so `plain`
   * is able to drop the horizontal padding that `size` imposes.
   */
  variants: {
    size: {
      sm: {
        itemTrigger: "min-h-9 gap-2 px-3 py-2.5 text-sm",
        itemIndicator: "text-base",
        itemBody: "px-3 pb-3 text-sm",
      },
      md: {
        itemTrigger: "min-h-11 gap-3 px-4 py-3 text-base",
        itemIndicator: "text-lg",
        itemBody: "px-4 pb-4 text-base",
      },
      lg: {
        itemTrigger: "min-h-14 gap-3 px-5 py-4 text-lg",
        itemIndicator: "text-xl",
        itemBody: "px-5 pb-5 text-base",
      },
    },

    variant: {
      /** One bordered card, hairline dividers between items. The default. */
      outline: {
        // `overflow-hidden` rounds the first and last trigger's hover fill along with
        // the container.
        root: "overflow-hidden rounded-lg border border-line bg-surface",
        item: "border-b border-line last:border-b-0",
        itemTrigger: "hover:bg-surface-subtle",
      },

      /** Tinted blocks with air between them. No outer container. */
      subtle: {
        root: "gap-2",
        item: "overflow-hidden rounded-md bg-surface-subtle",
        itemTrigger: "hover:bg-surface-muted",
      },

      /** Each item is its own raised card. The expanded one lifts further. */
      elevated: {
        root: "gap-3",
        item: [
          "overflow-hidden rounded-lg border border-line bg-surface shadow-sm",
          "transition-shadow duration-200 ease-in-out data-[state=open]:shadow-md",
        ],
        itemTrigger: "hover:bg-surface-subtle",
      },

      /**
       * Dividers only. Flush to the left, so it sits inside prose or a settings column
       * without indenting away from the copy around it.
       */
      plain: {
        item: "border-b border-line",
        itemTrigger: "px-0 hover:text-intent-label",
        itemBody: "px-0",
      },
    },

    /**
     * Re-points the eight `intent-*` roles at another hue. The accordion only spends two
     * of them — the expanded header's text and its indicator — but it spends them the
     * same way every other component does, so intent stays a single prop.
     *
     * The class lands on `root`; custom properties inherit, so every slot below follows.
     */
    colorPalette: {
      accent: { root: "intent-accent" },
      neutral: { root: "intent-neutral" },
      success: { root: "intent-success" },
      warning: { root: "intent-warning" },
      danger: { root: "intent-danger" },
      info: { root: "intent-info" },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
    colorPalette: "accent",
  },
});
