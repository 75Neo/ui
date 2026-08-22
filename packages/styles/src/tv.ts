import { createTV } from "tailwind-variants";

/**
 * Extra class groups `tailwind-merge` cannot infer.
 *
 * Conflict resolution is what makes an override merge cleanly: when a caller passes
 * `class="px-8"` to a button that already resolved to `px-4`, only `px-8` survives.
 * That works because `tailwind-merge` recognises both as the same group — and it only
 * recognises groups it ships with.
 *
 * Two of ours are new:
 *
 * - `intent-*` sets custom properties, so `tailwind-merge` sees an unknown class and
 *   would keep both `intent-accent` and `intent-danger`, leaving the winner to CSS
 *   source order. Declaring the group makes the last one win, like every other utility.
 * - `text-2xs` is a font size this system adds; without it, `text-2xs text-sm` would
 *   survive as both.
 *
 * Colours (`bg-intent-default`, `text-fg-muted`, `border-line`) need no entry —
 * `tailwind-merge` already groups anything under `bg-`/`text-`/`border-` that isn't a
 * more specific utility.
 */
export const twMergeConfig = {
  extend: {
    classGroups: {
      "font-size": [{ text: ["2xs"] }],
      intent: [{ intent: ["accent", "neutral", "success", "warning", "danger", "info"] }],
    },
  },
};

/**
 * The configured `tailwind-variants` entry point. Every component theme in this package
 * is built with it, and so is every theme override an app supplies — otherwise the two
 * halves would resolve conflicts differently.
 */
export const tv = createTV({ twMergeConfig });

export { cn, cx } from "tailwind-variants";
export type { ClassValue, VariantProps } from "tailwind-variants";
