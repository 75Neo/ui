import { defineRecipe } from "@pandacss/dev";

/**
 * One recipe, three frameworks: React, Vue and Svelte all render the class names
 * this produces, so button styling only ever changes here.
 */
export const button = defineRecipe({
  className: "neo-button",
  description: "The 75NeoUI button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    fontFamily: "sans",
    fontWeight: "medium",
    lineHeight: "1",
    whiteSpace: "nowrap",
    borderRadius: "md",
    borderWidth: "1px",
    borderColor: "transparent",
    cursor: "pointer",
    userSelect: "none",
    transition:
      "background-color {durations.fast}, color {durations.fast}, border-color {durations.fast}",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "border.accent",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "bg.accent",
        color: "fg.onAccent",
        _hover: { bg: "bg.accent.hover" },
      },
      outline: {
        borderColor: "border.strong",
        color: "fg",
        _hover: { bg: "bg.muted" },
      },
      ghost: {
        color: "fg",
        _hover: { bg: "bg.muted" },
      },
      danger: {
        bg: "bg.danger",
        color: "fg.onAccent",
        _hover: { filter: "brightness(0.92)" },
      },
    },
    size: {
      sm: { h: "8", px: "3", fontSize: "sm" },
      md: { h: "10", px: "4", fontSize: "md" },
      lg: { h: "12", px: "6", fontSize: "lg" },
    },
    fullWidth: {
      true: { width: "full" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
