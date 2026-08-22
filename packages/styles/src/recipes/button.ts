import { defineRecipe } from "./define";

/**
 * One recipe, three frameworks: React, Vue and Svelte all render the class names this
 * produces, so button styling only ever changes here.
 *
 * Shape and intent are separate axes. `variant` decides how much emphasis the button
 * carries (solid → subtle → outline → ghost → link); `colorPalette` decides what it
 * means. Every `variant` is written once against `colorPalette.*`, so all thirty
 * combinations exist without any of them being spelled out.
 */
export const button = defineRecipe({
  className: "neo-button",
  description: "The 75NeoUI button",

  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    fontFamily: "sans",
    fontWeight: "medium",
    lineHeight: "none",
    whiteSpace: "nowrap",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
    // Panda keyword, not a raw list: expands to color, background-color, border-color,
    // outline-color, text-decoration-color, fill and stroke.
    transitionProperty: "colors",
    transitionDuration: "fast",
    transitionTimingFunction: "default",
    // Colour comes from the global `:focus-visible` rule; only the offset is local.
    _focusVisible: {
      outlineOffset: "0.5",
    },
    // The dimming is what reads as disabled — it applies over whatever the variant's
    // hover state does, so hover needs no separate guard.
    _disabled: {
      opacity: "50",
      cursor: "not-allowed",
    },
  },

  /**
   * `size` is declared before `variant` deliberately. Panda emits variant classes in
   * declaration order, so the later group wins ties — which is how `link` is able to
   * drop the box (`height`, `padding`) that `size` would otherwise impose on it.
   */
  variants: {
    size: {
      xs: { h: "7", minW: "7", px: "2", gap: "1", fontSize: "xs", borderRadius: "sm" },
      sm: { h: "8", minW: "8", px: "3", gap: "1.5", fontSize: "sm", borderRadius: "sm" },
      md: { h: "10", minW: "10", px: "4", gap: "2", fontSize: "md", borderRadius: "md" },
      lg: { h: "12", minW: "12", px: "6", gap: "2.5", fontSize: "lg", borderRadius: "lg" },
    },

    variant: {
      /** Highest emphasis: a filled block. One per view, ideally. */
      solid: {
        bg: "colorPalette.default",
        color: "colorPalette.contrast",
        _hover: { bg: "colorPalette.emphasized" },
      },
      /** Filled, but tinted rather than solid — for secondary actions that still read as the intent. */
      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.text",
        _hover: { bg: "colorPalette.muted" },
      },
      /** Bordered. The default choice for anything sitting next to a `solid`. */
      outline: {
        borderColor: "colorPalette.border",
        color: "colorPalette.text",
        _hover: { bg: "colorPalette.subtle" },
      },
      /** No chrome until hovered. For toolbars and dense rows. */
      ghost: {
        color: "colorPalette.text",
        _hover: { bg: "colorPalette.subtle" },
      },
      /** Reads as a link but behaves as a button — for destructive or inline actions in prose. */
      link: {
        h: "auto",
        minW: "0",
        px: "0",
        color: "colorPalette.fg",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        borderRadius: "xs",
        _hover: { color: "colorPalette.text" },
      },
    },

    /**
     * Re-points the eight `colorPalette.*` roles at another hue. Because every `variant`
     * above is written against those roles, this is the only place intent is expressed.
     */
    colorPalette: {
      accent: { colorPalette: "accent" },
      neutral: { colorPalette: "neutral" },
      success: { colorPalette: "success" },
      warning: { colorPalette: "warning" },
      danger: { colorPalette: "danger" },
      info: { colorPalette: "info" },
    },

    fullWidth: {
      true: { width: "full" },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
    colorPalette: "accent",
  },
});
