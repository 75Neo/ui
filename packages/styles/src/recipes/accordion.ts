import { defineSlotRecipe } from "./define";

/**
 * One slot recipe, three frameworks. React, Vue and Svelte all render the class names
 * this produces, so accordion styling only ever changes here.
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
export const accordion = defineSlotRecipe({
  className: "neo-accordion",
  description: "The 75NeoUI accordion",

  slots: ["root", "item", "itemTrigger", "itemIndicator", "itemContent", "itemBody"],

  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "full",
      fontFamily: "sans",
    },

    item: {
      minWidth: "0",
      // An item expanding above the viewport would otherwise drag the scroll position
      // with it; the panel that opened should stay where the user clicked.
      overflowAnchor: "none",
    },

    itemTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "full",
      textAlign: "start",
      fontFamily: "sans",
      fontWeight: "medium",
      lineHeight: "snug",
      color: "fg.default",
      bg: "transparent",
      borderWidth: "none",
      cursor: "pointer",
      // Panda keyword, not a raw list: expands to color, background-color, border-color,
      // outline-color, text-decoration-color, fill and stroke.
      transitionProperty: "colors",
      transitionDuration: "fast",
      transitionTimingFunction: "default",
      _hover: { color: "colorPalette.text" },
      // The expanded header is the one place the accordion carries its intent colour.
      _open: { color: "colorPalette.text" },
      // Colour comes from the global `:focus-visible` rule; only the offset is local.
      // It is negative because the boxed variants clip their corners, and an outward
      // ring on a full-bleed trigger would be cut off by that clip.
      _focusVisible: { outlineOffset: "-0.5" },
      _disabled: {
        color: "fg.disabled",
        cursor: "not-allowed",
        _hover: { bg: "transparent", color: "fg.disabled" },
      },
    },

    itemIndicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      color: "fg.muted",
      transitionProperty: "[transform]",
      transitionDuration: "normal",
      transitionTimingFunction: "default",
      _open: {
        color: "colorPalette.fg",
        transform: "rotate(180deg)",
      },
      _motionReduce: { transitionProperty: "[none]" },
      // Icons scale with the trigger's type ramp rather than being sized per call site.
      "& svg": { width: "[1em]", height: "[1em]" },
    },

    itemContent: {
      // Both halves of the animation: the keyframes interpolate `height`, and this is
      // what keeps the body from spilling out while they do.
      overflow: "hidden",
      // `collapse-in`/`collapse-out` read the `--height` Ark measures onto this element.
      _open: { animation: "collapse-in" },
      _closed: { animation: "collapse-out" },
      _motionReduce: { animation: "[none]" },
    },

    itemBody: {
      color: "fg.muted",
      lineHeight: "relaxed",
    },
  },

  /**
   * `size` is declared before `variant` deliberately. Panda emits variant classes in
   * declaration order, so the later group wins ties — which is how `plain` is able to
   * drop the horizontal padding that `size` would otherwise impose on it.
   */
  variants: {
    size: {
      sm: {
        itemTrigger: { minHeight: "9", px: "3", py: "2.5", gap: "2", fontSize: "sm" },
        itemIndicator: { fontSize: "md" },
        itemBody: { px: "3", pb: "3", fontSize: "sm" },
      },
      md: {
        itemTrigger: { minHeight: "11", px: "4", py: "3", gap: "3", fontSize: "md" },
        itemIndicator: { fontSize: "lg" },
        itemBody: { px: "4", pb: "4", fontSize: "md" },
      },
      lg: {
        itemTrigger: { minHeight: "14", px: "5", py: "4", gap: "3", fontSize: "lg" },
        itemIndicator: { fontSize: "xl" },
        itemBody: { px: "5", pb: "5", fontSize: "md" },
      },
    },

    variant: {
      /** One bordered card, hairline dividers between items. The default. */
      outline: {
        root: {
          bg: "bg.default",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          borderRadius: "lg",
          // Rounds the first and last trigger's hover fill along with the container.
          overflow: "hidden",
        },
        item: {
          borderBottomWidth: "thin",
          borderBottomStyle: "solid",
          borderBottomColor: "border.default",
          _last: { borderBottomWidth: "none" },
        },
        itemTrigger: { _hover: { bg: "bg.subtle" } },
      },

      /** Tinted blocks with air between them. No outer container. */
      subtle: {
        root: { gap: "2" },
        item: {
          bg: "bg.subtle",
          borderRadius: "md",
          overflow: "hidden",
        },
        itemTrigger: { _hover: { bg: "bg.muted" } },
      },

      /** Each item is its own raised card. The expanded one lifts further. */
      elevated: {
        root: { gap: "3" },
        item: {
          bg: "bg.default",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          borderRadius: "lg",
          overflow: "hidden",
          boxShadow: "sm",
          transitionProperty: "[box-shadow]",
          transitionDuration: "normal",
          transitionTimingFunction: "default",
          _open: { boxShadow: "md" },
        },
        itemTrigger: { _hover: { bg: "bg.subtle" } },
      },

      /**
       * Dividers only. Flush to the left, so it sits inside prose or a settings column
       * without indenting away from the copy around it.
       */
      plain: {
        item: {
          borderBottomWidth: "thin",
          borderBottomStyle: "solid",
          borderBottomColor: "border.default",
        },
        itemTrigger: {
          px: "0",
          _hover: { color: "colorPalette.text" },
        },
        itemBody: { px: "0" },
      },
    },

    /**
     * Re-points the eight `colorPalette.*` roles at another hue. The accordion only
     * spends two of them — the expanded header's text and its indicator — but it spends
     * them the same way every other component does, so intent stays a single prop.
     */
    colorPalette: {
      accent: { root: { colorPalette: "accent" } },
      neutral: { root: { colorPalette: "neutral" } },
      success: { root: { colorPalette: "success" } },
      warning: { root: { colorPalette: "warning" } },
      danger: { root: { colorPalette: "danger" } },
      info: { root: { colorPalette: "info" } },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "outline",
    colorPalette: "accent",
  },
});
