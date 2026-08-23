import { createTV } from "tailwind-variants";

/**
 * Extra class groups `tailwind-merge` cannot infer.
 *
 * Conflict resolution is what makes an override merge cleanly: when a caller passes
 * `class="px-8"` to a button that already resolved to `px-2.5`, only `px-8` survives.
 * That works because `tailwind-merge` recognises both as the same group — and it only
 * recognises groups it ships with.
 *
 * One of ours is new. `intent-*` sets a custom property, so `tailwind-merge` sees an
 * unknown class and would keep both `intent-primary` and `intent-error`, leaving the
 * winner to CSS source order. Declaring the group makes the last one win, like every
 * other utility.
 *
 * Colours (`bg-intent`, `text-muted`, `ring-accented`) need no entry —
 * `tailwind-merge` already groups anything under `bg-`/`text-`/`ring-` that isn't a
 * more specific utility, alpha modifiers included.
 */
export const twMergeConfig = {
  extend: {
    classGroups: {
      intent: [
        {
          intent: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
        },
      ],
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
