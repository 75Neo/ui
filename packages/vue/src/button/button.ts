import { button, type ButtonVariantProps } from "@75neo/styles/recipes";
import { ark } from "@ark-ui/vue/factory";
import { computed, defineComponent, h, type PropType } from "vue";

export type ButtonProps = ButtonVariantProps;

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` recipe.
 *
 * Variant props are declared, everything else falls through as attrs — including
 * `class`, which Vue merges with the recipe's class list for us.
 */
export const Button = defineComponent({
  name: "NeoButton",
  props: {
    variant: { type: String as PropType<ButtonProps["variant"]>, default: undefined },
    size: { type: String as PropType<ButtonProps["size"]>, default: undefined },
    fullWidth: { type: Boolean as PropType<ButtonProps["fullWidth"]>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => button(props));

    return () => h(ark.button, { class: className.value }, slots.default);
  },
});
