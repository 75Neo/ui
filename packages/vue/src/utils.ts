import type { ClassValue } from "@75neo/styles";
import { computed, useAttrs } from "vue";

/**
 * Splits `$attrs` into the caller's `class` and everything else.
 *
 * Every component sets `inheritAttrs: false` and binds the remainder itself, because
 * `v-bind="$attrs"` next to a `:class` makes Vue *concatenate* the two class lists —
 * `px-4` and a caller's `px-8` would both survive, leaving CSS source order to pick the
 * winner. Passing `attrsClass` through the theme's slot function instead lets
 * `tailwind-merge` resolve the conflict, which is what makes an override an override.
 *
 * Reading `useAttrs()` inside a computed is safe: the proxy it returns tracks `$attrs`
 * on the instance, so both computeds invalidate when the caller's attributes change.
 */
export const useSplitAttrs = () => {
  const attrs = useAttrs();

  return {
    attrsClass: computed(() => attrs.class as ClassValue),
    otherAttrs: computed(() => {
      const { class: _class, ...rest } = attrs;

      return rest;
    }),
  };
};
