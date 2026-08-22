import type { ButtonSlots, ButtonVariants, ClassValue } from "@75neo/styles";
import { ark } from "@ark-ui/vue/factory";
import { computed, defineComponent, h, type PropType } from "vue";
import { useComponentTheme } from "../theme";

export type ButtonProps = ButtonVariants & {
  /**
   * Per-slot class overrides. A button is one element, so `ui.base` and `class` do the
   * same thing — `ui` exists so every component in the library takes the same two props.
   */
  ui?: ButtonSlots;
};

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` theme.
 *
 * `inheritAttrs` is off so the caller's `class` can be merged rather than concatenated:
 * Vue's own attribute merging would keep both `px-4` and a caller's `px-8`, leaving CSS
 * source order to decide. Routing it through the theme's slot function lets
 * `tailwind-merge` resolve the conflict instead.
 */
export const Button = defineComponent({
  name: "NeoButton",
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<ButtonProps["variant"]>, default: undefined },
    size: { type: String as PropType<ButtonProps["size"]>, default: undefined },
    colorPalette: {
      type: String as PropType<ButtonProps["colorPalette"]>,
      default: undefined,
    },
    fullWidth: { type: Boolean as PropType<ButtonProps["fullWidth"]>, default: undefined },
    ui: { type: Object as PropType<ButtonProps["ui"]>, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const theme = useComponentTheme("button");

    const className = computed(() =>
      theme
        .value({
          variant: props.variant,
          size: props.size,
          colorPalette: props.colorPalette,
          fullWidth: props.fullWidth,
        })
        .base({ class: [props.ui?.base, attrs.class as ClassValue] }),
    );

    return () => h(ark.button, { ...attrs, class: className.value }, slots.default);
  },
});
