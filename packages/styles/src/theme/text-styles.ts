import { defineTextStyles } from "@pandacss/dev";

/**
 * Named type ramps. A heading should be a single `textStyle: "heading.lg"` rather than
 * four properties repeated at every call site — that is what keeps size, leading, weight
 * and tracking moving together when the ramp is retuned.
 *
 * Tracking tightens as size grows and opens up on small labels, which is the usual
 * optical correction: large text looks loose at default tracking, small text looks
 * cramped.
 */
export const textStyles = defineTextStyles({
  /** Marketing-scale type. Rare in product UI. */
  display: {
    lg: {
      value: {
        fontSize: "6xl",
        lineHeight: "none",
        fontWeight: "bold",
        letterSpacing: "tighter",
      },
    },
    md: {
      value: {
        fontSize: "5xl",
        lineHeight: "none",
        fontWeight: "bold",
        letterSpacing: "tighter",
      },
    },
    sm: {
      value: {
        fontSize: "4xl",
        lineHeight: "tight",
        fontWeight: "bold",
        letterSpacing: "tight",
      },
    },
  },

  heading: {
    xl: {
      value: {
        fontSize: "3xl",
        lineHeight: "tight",
        fontWeight: "semibold",
        letterSpacing: "tight",
      },
    },
    lg: {
      value: {
        fontSize: "2xl",
        lineHeight: "tight",
        fontWeight: "semibold",
        letterSpacing: "tight",
      },
    },
    md: {
      value: {
        fontSize: "xl",
        lineHeight: "snug",
        fontWeight: "semibold",
        letterSpacing: "normal",
      },
    },
    sm: {
      value: {
        fontSize: "lg",
        lineHeight: "snug",
        fontWeight: "semibold",
        letterSpacing: "normal",
      },
    },
  },

  /** Running copy. Generous leading; this is the only ramp meant for paragraphs. */
  body: {
    lg: { value: { fontSize: "lg", lineHeight: "relaxed", fontWeight: "normal" } },
    md: { value: { fontSize: "md", lineHeight: "normal", fontWeight: "normal" } },
    sm: { value: { fontSize: "sm", lineHeight: "normal", fontWeight: "normal" } },
    xs: { value: { fontSize: "xs", lineHeight: "normal", fontWeight: "normal" } },
  },

  /**
   * Single-line UI text: buttons, form labels, table headers. Leading is `none` because
   * these are vertically centred by their container, not by line box.
   */
  label: {
    lg: { value: { fontSize: "md", lineHeight: "none", fontWeight: "medium" } },
    md: { value: { fontSize: "sm", lineHeight: "none", fontWeight: "medium" } },
    sm: {
      value: {
        fontSize: "xs",
        lineHeight: "none",
        fontWeight: "medium",
        letterSpacing: "wide",
      },
    },
  },

  code: {
    value: { fontFamily: "mono", fontSize: "sm", lineHeight: "normal", fontWeight: "normal" },
  },
});
