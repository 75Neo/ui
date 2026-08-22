import { tv } from "../tv";

/**
 * One theme, three frameworks: React, Vue and Svelte all render the class names this
 * produces, so button styling only ever changes here.
 *
 * Shape and intent are separate axes. `variant` decides how much emphasis the button
 * carries (solid → subtle → outline → ghost → link); `colorPalette` decides what it
 * means. Every `variant` is written once against the `intent-*` roles, so all thirty
 * combinations exist without any of them being spelled out.
 */
export const button = tv({
  slots: {
    base: [
      "inline-flex shrink-0 items-center justify-center",
      "cursor-pointer select-none whitespace-nowrap",
      "border border-transparent font-medium leading-none",
      "transition-colors duration-150 ease-in-out",
      // The dimming is what reads as disabled — it applies over whatever the variant's
      // hover state does, so hover needs no separate guard. Colour comes from the global
      // `:focus-visible` rule in `css/base.css`; components never restyle it.
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
  },

  /**
   * `size` is declared before `variant` deliberately. `tailwind-variants` appends
   * variant classes in declaration order and `tailwind-merge` lets the last one win, so
   * `link` is able to drop the box (`h-*`, `px-*`, `rounded-*`) that `size` imposes.
   */
  variants: {
    size: {
      xs: { base: "h-7 min-w-7 gap-1 rounded-sm px-2 text-xs" },
      sm: { base: "h-8 min-w-8 gap-1.5 rounded-sm px-3 text-sm" },
      md: { base: "h-10 min-w-10 gap-2 rounded-md px-4 text-base" },
      lg: { base: "h-12 min-w-12 gap-2.5 rounded-lg px-6 text-lg" },
    },

    variant: {
      /** Highest emphasis: a filled block. One per view, ideally. */
      solid: {
        base: "bg-intent-default text-intent-contrast hover:bg-intent-emphasized",
      },
      /** Filled, but tinted rather than solid — for secondary actions that still read as the intent. */
      subtle: {
        base: "bg-intent-subtle text-intent-label hover:bg-intent-muted",
      },
      /** Bordered. The default choice for anything sitting next to a `solid`. */
      outline: {
        base: "border-intent-line text-intent-label hover:bg-intent-subtle",
      },
      /** No chrome until hovered. For toolbars and dense rows. */
      ghost: {
        base: "text-intent-label hover:bg-intent-subtle",
      },
      /** Reads as a link but behaves as a button — for destructive or inline actions in prose. */
      link: {
        base: [
          "h-auto min-w-0 rounded-xs px-0",
          "text-intent-fg underline underline-offset-[3px] hover:text-intent-label",
        ],
      },
    },

    /**
     * Re-points the eight `intent-*` roles at another hue. Because every `variant` above
     * is written against those roles, this is the only place intent is expressed.
     */
    colorPalette: {
      accent: { base: "intent-accent" },
      neutral: { base: "intent-neutral" },
      success: { base: "intent-success" },
      warning: { base: "intent-warning" },
      danger: { base: "intent-danger" },
      info: { base: "intent-info" },
    },

    fullWidth: {
      true: { base: "w-full" },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
    colorPalette: "accent",
  },
});
