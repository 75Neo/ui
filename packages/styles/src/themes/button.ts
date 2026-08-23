import { tv } from "../tv";

/**
 * One theme, three frameworks: React, Vue and Svelte all render the class names this
 * produces, so button styling only ever changes here.
 *
 * Six variants across seven palettes, and only the six *shapes* are written down: each
 * one is spelled once against `intent-*`, a palette re-points a single custom property,
 * and every shape follows. See `css/intents.css`.
 *
 * `neutral` is the exception, and is spelled out in `compoundVariants` below for the
 * reason given there.
 */
export const button = tv({
  slots: {
    base: [
      "inline-flex items-center rounded-md font-medium transition-colors",
      "disabled:cursor-not-allowed disabled:opacity-75",
      "aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
      /*
       * The focus ring is per-component in this system rather than global: a wide,
       * translucent halo in the button's own palette. Only the width is shared, so it
       * sits here; the colour is part of each shape below.
       */
      "focus-visible:outline-3",
    ],
    label: "truncate",
    leadingIcon: "shrink-0",
    trailingIcon: "shrink-0",
  },

  variants: {
    /**
     * Re-points `--ui-intent` at another palette. Because every `variant` below is
     * written against it, this is the only place intent is expressed — one line per
     * palette instead of one line per palette *and* shape.
     */
    color: {
      primary: { base: "intent-primary" },
      secondary: { base: "intent-secondary" },
      success: { base: "intent-success" },
      info: { base: "intent-info" },
      warning: { base: "intent-warning" },
      error: { base: "intent-error" },
      neutral: { base: "intent-neutral" },
    },

    variant: {
      /** Highest emphasis: a filled block. One per view, ideally. */
      solid: {
        base: [
          "text-inverted bg-intent outline-intent/25",
          "hover:bg-intent/75 active:bg-intent/75",
          "disabled:bg-intent aria-disabled:bg-intent",
        ],
      },
      /** Bordered. The default choice for anything sitting next to a `solid`. */
      outline: {
        base: [
          "text-intent ring ring-inset ring-intent/50",
          "outline-intent/25 focus-visible:ring-intent",
          "hover:bg-intent/10 active:bg-intent/10",
          "disabled:bg-transparent aria-disabled:bg-transparent",
          "dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
        ],
      },
      /** A tint with no border — for secondary actions that still read as the intent. */
      soft: {
        base: [
          "text-intent bg-intent/10 outline-intent/25",
          "hover:bg-intent/15 active:bg-intent/15",
          "disabled:bg-intent/10 aria-disabled:bg-intent/10",
        ],
      },
      /** `soft` with `outline`'s ring — the tint and the edge together. */
      subtle: {
        base: [
          "text-intent bg-intent/10 ring ring-inset ring-intent/25",
          "outline-intent/25 focus-visible:ring-intent",
          "hover:bg-intent/15 active:bg-intent/15",
          "disabled:bg-intent/10 aria-disabled:bg-intent/10",
        ],
      },
      /** No chrome until hovered. For toolbars and dense rows. */
      ghost: {
        base: [
          "text-intent outline-intent/25",
          "hover:bg-intent/10 active:bg-intent/10",
          "disabled:bg-transparent aria-disabled:bg-transparent",
          "dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
        ],
      },
      /** Reads as a link but behaves as a button — for inline actions in prose. */
      link: {
        base: [
          "text-intent outline-intent/25",
          "hover:text-intent/75 active:text-intent/75",
          "disabled:text-intent aria-disabled:text-intent",
        ],
      },
    },

    /**
     * Padding-driven rather than height-driven, so a button grows with its own text and
     * lines up with an input of the same size without either being told a pixel height.
     */
    size: {
      xs: {
        base: "gap-1 px-2 py-1 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      sm: {
        base: "gap-1.5 px-2.5 py-1.5 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      md: {
        base: "gap-1.5 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      lg: {
        base: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      xl: {
        base: "gap-2 px-3 py-2 text-base",
        leadingIcon: "size-6",
        trailingIcon: "size-6",
      },
    },

    /** Full width. The trailing icon is pushed to the far edge rather than trailing the
     * label, which is what makes a block button read as a row. */
    block: {
      true: {
        base: "w-full justify-center",
        trailingIcon: "ms-auto",
      },
    },

    /**
     * Equal padding on all sides — an icon-only button. Set automatically when there is
     * no label and no default slot, so it rarely has to be passed. The padding itself is
     * per size, in `compoundVariants`.
     */
    square: {
      true: "",
    },

    /**
     * Whether an icon is being rendered on each side. Both are derived by the components
     * rather than passed, and exist so `loading` knows which of the two icons is the
     * spinner.
     */
    leading: {
      true: "",
    },
    trailing: {
      true: "",
    },

    loading: {
      true: "",
    },
  },

  /*
   * Every `class` here is keyed by slot, even the single-slot ones. On a slotted theme
   * `tailwind-variants` accepts a string or a slot-keyed object and *silently ignores*
   * an array, so `class: ["a", "b"]` would compile without complaint and style nothing.
   */
  compoundVariants: [
    /*
     * `neutral` is drawn from the background ramp rather than a hue, so it recedes
     * instead of reading as a seventh palette: `bg-inverted` for the filled shape,
     * `bg-elevated`/`ring-accented` for the rest. That cannot be expressed by
     * re-pointing `--ui-intent`, so these six pairs are spelled out.
     *
     * They land after the `variant` classes and `tailwind-merge` drops whichever loses,
     * so each one only has to name what differs.
     */
    {
      color: "neutral",
      variant: "solid",
      class: {
        base: [
          "text-inverted bg-inverted outline-inverted/25",
          "hover:bg-inverted/90 active:bg-inverted/90",
          "disabled:bg-inverted aria-disabled:bg-inverted",
        ],
      },
    },
    {
      color: "neutral",
      variant: "outline",
      class: {
        base: [
          "text-default bg-default ring ring-inset ring-accented",
          "outline-inverted/25 focus-visible:ring-inverted",
          "hover:bg-elevated active:bg-elevated",
          "disabled:bg-default aria-disabled:bg-default",
        ],
      },
    },
    {
      color: "neutral",
      variant: "soft",
      class: {
        base: [
          "text-default bg-elevated outline-inverted/25",
          "hover:bg-accented/75 active:bg-accented/75",
          "disabled:bg-elevated aria-disabled:bg-elevated",
        ],
      },
    },
    {
      color: "neutral",
      variant: "subtle",
      class: {
        base: [
          "text-default bg-elevated ring ring-inset ring-accented",
          "outline-inverted/25 focus-visible:ring-inverted",
          "hover:bg-accented/75 active:bg-accented/75",
          "disabled:bg-elevated aria-disabled:bg-elevated",
        ],
      },
    },
    {
      color: "neutral",
      variant: "ghost",
      class: {
        base: [
          "text-default outline-inverted/25",
          "hover:bg-elevated active:bg-elevated",
          "hover:disabled:bg-transparent dark:hover:disabled:bg-transparent",
          "hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
        ],
      },
    },
    {
      color: "neutral",
      variant: "link",
      class: {
        base: [
          "text-muted outline-inverted/25",
          "hover:text-default active:text-default",
          "disabled:text-muted aria-disabled:text-muted",
        ],
      },
    },

    /* An icon-only button is square, so its horizontal padding drops to the vertical. */
    { size: "xs", square: true, class: { base: "p-1" } },
    { size: "sm", square: true, class: { base: "p-1.5" } },
    { size: "md", square: true, class: { base: "p-1.5" } },
    { size: "lg", square: true, class: { base: "p-2" } },
    { size: "xl", square: true, class: { base: "p-2" } },

    /* Whichever side the spinner replaced an icon on is the side that spins. */
    { loading: true, leading: true, class: { leadingIcon: "animate-spin" } },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: { trailingIcon: "animate-spin" },
    },
  ],

  defaultVariants: {
    color: "primary",
    variant: "solid",
    size: "md",
  },
});
