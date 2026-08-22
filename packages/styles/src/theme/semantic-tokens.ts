import { defineSemanticTokens } from "@pandacss/dev";

/** The eight roles every intent palette fills. */
type IntentRole =
  | "subtle"
  | "muted"
  | "default"
  | "emphasized"
  | "border"
  | "fg"
  | "text"
  | "contrast";

/** Each role as a `[light, dark]` pair. */
type IntentShades = Record<IntentRole, [light: string, dark: string]>;

/**
 * Expands a light/dark pair per role into Panda semantic tokens.
 *
 * Every intent palette is built through this, so all six end up with an identical shape.
 * That is what makes Panda's `colorPalette` work: a recipe writes
 * `bg: "colorPalette.default"` once, and swapping `colorPalette: "danger"` for
 * `colorPalette: "success"` re-points all eight roles at the other hue.
 */
const intent = (shades: IntentShades) => ({
  /** Tinted background — the resting state of a low-emphasis control. */
  subtle: { value: { base: shades.subtle[0], _dark: shades.subtle[1] } },
  /** Tinted background, one step up — the hover state of `subtle`. */
  muted: { value: { base: shades.muted[0], _dark: shades.muted[1] } },
  /** Solid fill — the resting state of a high-emphasis control. */
  default: { value: { base: shades.default[0], _dark: shades.default[1] } },
  /** Solid fill, one step up — the hover state of `default`. */
  emphasized: { value: { base: shades.emphasized[0], _dark: shades.emphasized[1] } },
  /** Border on an otherwise unfilled control. */
  border: { value: { base: shades.border[0], _dark: shades.border[1] } },
  /** Icons and de-emphasised accents drawn on a plain background. */
  fg: { value: { base: shades.fg[0], _dark: shades.fg[1] } },
  /** Label text on `subtle` or on a plain background. */
  text: { value: { base: shades.text[0], _dark: shades.text[1] } },
  /** Label text on `default` and `emphasized`. */
  contrast: { value: { base: shades.contrast[0], _dark: shades.contrast[1] } },
});

/**
 * The surface every component styles against. Each value resolves per colour mode, so a
 * component never has to branch on `_dark` itself.
 *
 * ## How the intent palettes were picked
 *
 * `contrast` is chosen per palette *and per mode* so it clears WCAG AA (4.5:1) against
 * both `default` and `emphasized`. That is why the palettes are not symmetric:
 *
 * - `accent` and `danger` are dark enough at their solid steps to carry white text, so
 *   they darken on hover (600 → 700 in light, 500 → 600 in dark) and keep white
 *   throughout.
 * - `success`, `warning` and `info` cannot carry white text at a brightness that reads
 *   as green/amber/blue. In dark mode they invert instead: a vivid 400 fill with the
 *   950 shade as text. Hovering still darkens (400 → 500), which preserves contrast.
 *
 * Changing a solid step means re-checking its `contrast` pair. The ratios above are what
 * make the difference between a design system and a set of colours.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    /** Page and surface backgrounds. Ordered: canvas sits behind `default`. */
    bg: {
      canvas: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.950}" } },
      default: { value: { base: "{colors.white}", _dark: "{colors.gray.900}" } },
      subtle: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" } },
      muted: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" } },
      emphasized: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.600}" } },
      inverted: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" } },
      disabled: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" } },
    },

    /**
     * Text and icons, as an emphasis ramp. Measured against `bg.default`:
     *
     * - `default` — 17.7:1 light, 17.0:1 dark.
     * - `muted` — 7.7:1 light, 6.9:1 dark. Secondary copy. Deliberately gray.600 rather
     *   than gray.500, which would leave it at 4.8:1 with no headroom.
     * - `subtle` — 4.8:1 light, **3.7:1 dark**. Clears AA Large and non-text contrast in
     *   both modes but *not* AA for body text in dark. It is the placeholder/watermark
     *   rung; anything a user has to read belongs on `muted`.
     * - `disabled` — below AA by design. WCAG exempts inactive controls, and the whole
     *   point of the token is to look unavailable.
     */
    fg: {
      default: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" } },
      muted: { value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" } },
      subtle: { value: { base: "{colors.gray.500}", _dark: "{colors.gray.500}" } },
      disabled: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
      inverted: { value: { base: "{colors.white}", _dark: "{colors.gray.900}" } },
    },

    border: {
      default: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" } },
      subtle: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.900}" } },
      emphasized: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" } },
      disabled: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" } },
      /** The focus ring. Deliberately one token, so focus looks the same everywhere. */
      outline: { value: { base: "{colors.neo.500}", _dark: "{colors.neo.400}" } },
    },

    // ── Intent palettes ────────────────────────────────────────────────────────
    // Each entry below is `role: [light, dark]`.

    /** Brand and primary actions. */
    accent: intent({
      subtle: ["{colors.neo.50}", "{colors.neo.950}"],
      muted: ["{colors.neo.100}", "{colors.neo.900}"],
      default: ["{colors.neo.600}", "{colors.neo.500}"],
      emphasized: ["{colors.neo.700}", "{colors.neo.600}"],
      border: ["{colors.neo.500}", "{colors.neo.400}"],
      fg: ["{colors.neo.600}", "{colors.neo.400}"],
      text: ["{colors.neo.700}", "{colors.neo.200}"],
      contrast: ["{colors.white}", "{colors.white}"],
    }),

    /** Secondary actions. The solid step is near-black on light, near-white on dark. */
    neutral: intent({
      subtle: ["{colors.gray.100}", "{colors.gray.800}"],
      muted: ["{colors.gray.200}", "{colors.gray.700}"],
      default: ["{colors.gray.900}", "{colors.gray.100}"],
      emphasized: ["{colors.gray.800}", "{colors.gray.200}"],
      border: ["{colors.gray.300}", "{colors.gray.700}"],
      fg: ["{colors.gray.600}", "{colors.gray.400}"],
      text: ["{colors.gray.900}", "{colors.gray.50}"],
      contrast: ["{colors.white}", "{colors.gray.900}"],
    }),

    /** Confirmation and completion. Inverts to dark-on-bright in dark mode. */
    success: intent({
      subtle: ["{colors.green.50}", "{colors.green.950}"],
      muted: ["{colors.green.100}", "{colors.green.900}"],
      default: ["{colors.green.700}", "{colors.green.400}"],
      emphasized: ["{colors.green.800}", "{colors.green.500}"],
      border: ["{colors.green.500}", "{colors.green.500}"],
      fg: ["{colors.green.600}", "{colors.green.400}"],
      text: ["{colors.green.700}", "{colors.green.300}"],
      contrast: ["{colors.white}", "{colors.green.950}"],
    }),

    /** Reversible risk. Amber is too bright for white text in *either* mode. */
    warning: intent({
      subtle: ["{colors.amber.50}", "{colors.amber.950}"],
      muted: ["{colors.amber.100}", "{colors.amber.900}"],
      default: ["{colors.amber.500}", "{colors.amber.400}"],
      emphasized: ["{colors.amber.600}", "{colors.amber.500}"],
      border: ["{colors.amber.500}", "{colors.amber.500}"],
      fg: ["{colors.amber.600}", "{colors.amber.400}"],
      text: ["{colors.amber.700}", "{colors.amber.300}"],
      contrast: ["{colors.gray.950}", "{colors.amber.950}"],
    }),

    /** Destructive actions and validation failures. */
    danger: intent({
      subtle: ["{colors.red.50}", "{colors.red.950}"],
      muted: ["{colors.red.100}", "{colors.red.900}"],
      default: ["{colors.red.600}", "{colors.red.600}"],
      emphasized: ["{colors.red.700}", "{colors.red.700}"],
      border: ["{colors.red.500}", "{colors.red.500}"],
      fg: ["{colors.red.600}", "{colors.red.400}"],
      text: ["{colors.red.700}", "{colors.red.300}"],
      contrast: ["{colors.white}", "{colors.white}"],
    }),

    /** Neutral notices. Inverts to dark-on-bright in dark mode. */
    info: intent({
      subtle: ["{colors.sky.50}", "{colors.sky.950}"],
      muted: ["{colors.sky.100}", "{colors.sky.900}"],
      default: ["{colors.sky.700}", "{colors.sky.400}"],
      emphasized: ["{colors.sky.800}", "{colors.sky.500}"],
      border: ["{colors.sky.500}", "{colors.sky.500}"],
      fg: ["{colors.sky.600}", "{colors.sky.400}"],
      text: ["{colors.sky.700}", "{colors.sky.300}"],
      contrast: ["{colors.white}", "{colors.sky.950}"],
    }),
  },

  /**
   * Shadows are semantic because elevation does not survive a mode flip. A shadow tuned
   * for white needs roughly four times the alpha to read against `gray.900`, and gains a
   * hairline top border to suggest the light source the shadow alone no longer implies.
   */
  shadows: {
    xs: {
      value: {
        base: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        _dark: "0 1px 2px 0 rgb(0 0 0 / 0.5)",
      },
    },
    sm: {
      value: {
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        _dark: "0 1px 3px 0 rgb(0 0 0 / 0.6), 0 1px 2px -1px rgb(0 0 0 / 0.5)",
      },
    },
    md: {
      value: {
        base: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        _dark: "0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.5)",
      },
    },
    lg: {
      value: {
        base: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        _dark: "0 10px 15px -3px rgb(0 0 0 / 0.7), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
      },
    },
    xl: {
      value: {
        base: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        _dark: "0 20px 25px -5px rgb(0 0 0 / 0.75), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
      },
    },
    inner: {
      value: {
        base: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        _dark: "inset 0 2px 4px 0 rgb(0 0 0 / 0.4)",
      },
    },
  },
});
