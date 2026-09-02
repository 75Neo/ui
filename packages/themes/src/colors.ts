/**
 * The color vocabulary every recipe shares.
 *
 * @remarks
 * Two ideas hold this file together.
 *
 * The first is that there is one token per color. A recipe never asks for a second,
 * darker token to hover with; it asks for the same color at a different strength, with
 * Tailwind's opacity modifier. Six strengths cover every component in the library, and
 * they mean the same thing wherever they appear:
 *
 * | Strength | What it is for                                            |
 * | -------- | --------------------------------------------------------- |
 * | `/10`    | a soft, tinted fill                                       |
 * | `/15`    | that fill, hovered or pressed                             |
 * | `/25`    | a hairline ring, and the focus halo                       |
 * | `/50`    | a visible ring that still reads as a border               |
 * | `/75`    | a solid fill or solid text, hovered or pressed            |
 * | full     | a solid fill, text on the page, or a ring under focus     |
 *
 * `packages/themes/src/tokens/utilities.css` safelists exactly this set, because the
 * helpers below interpolate the color name and Tailwind's scanner only reads literals.
 * A strength used in a recipe but missing there renders as no style at all.
 *
 * The second is that `neutral` is not one of these. It has no hue to spend, so it
 * borrows the surface tokens instead — `bg-inverted`, `bg-elevated`, `ring-accented`.
 * Every recipe with a `color` variant therefore generates six entries and writes the
 * seventh by hand.
 */

/**
 * The colors that carry a hue, in the order they appear in previews and docs.
 *
 * @remarks
 * Each has one token, `--ui-<name>`, set to the shade where it first clears WCAG AA
 * against the page background. That one threshold is what lets a single value serve
 * both as text on the page and as a fill carrying `text-inverted`.
 */
export const themeColors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

/** One of the hued colors. */
export type ThemeColor = (typeof themeColors)[number];

/** Every value a component's `color` variant accepts, hues plus `neutral`. */
export const componentColors = [...themeColors, "neutral"] as const;

/** One of the values a component's `color` variant accepts. */
export type ComponentColor = (typeof componentColors)[number];

/**
 * Build one variant entry per hued color.
 *
 * @param build - Called once per color. Return whatever a variant entry holds: a class
 * string for a slotless recipe, or a per-slot object for one with slots.
 * @returns An object keyed by color, typed so `VariantProps` still reads the values as
 * a literal union.
 *
 * @remarks
 * Spread `neutral` in alongside it, since `neutral` styles itself from the surface
 * tokens rather than from a hue.
 *
 * @example
 * ```ts
 * color: {
 *   ...byColor((color) => ({ range: `stroke-${color}` })),
 *   neutral: { range: "stroke-inverted" },
 * }
 * ```
 */
export function byColor<T>(build: (color: ThemeColor) => T): { [C in ThemeColor]: T } {
  return Object.fromEntries(themeColors.map((color) => [color, build(color)])) as {
    [C in ThemeColor]: T;
  };
}

/**
 * Build one compound-variant row per hued color.
 *
 * @param build - Called once per color. Return the whole row, including the keys that
 * select it.
 * @returns One row per color, ready to spread into `compoundVariants`.
 *
 * @remarks
 * This is the replacement for writing a variant × color table out by hand. A recipe
 * with six variants and seven colors is six calls and one hand-written `neutral` block
 * rather than forty-two entries, and a new variant costs one more call.
 *
 * @example
 * ```ts
 * compoundVariants: [
 *   ...eachColor((color) => ({
 *     color,
 *     variant: "solid" as const,
 *     class: `bg-${color} text-inverted hover:bg-${color}/75`,
 *   })),
 *   { color: "neutral", variant: "solid", class: "bg-inverted text-inverted" },
 * ]
 * ```
 */
export function eachColor<T>(build: (color: ThemeColor) => T): T[] {
  return themeColors.map((color) => build(color));
}
