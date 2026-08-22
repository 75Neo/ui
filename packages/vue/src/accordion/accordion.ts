import type { AccordionSlots, AccordionVariants, ClassValue, Themes } from "@75neo/styles";
import { Accordion as Ark, type UseAccordionReturn } from "@ark-ui/vue/accordion";
import { ChevronDownIcon } from "@lucide/vue";
import {
  computed,
  type ComputedRef,
  defineComponent,
  h,
  inject,
  type InjectionKey,
  type PropType,
  provide,
  type UnwrapRef,
} from "vue";
import { useComponentTheme } from "../theme";

/**
 * The shared `accordion` theme wearing Ark's accordion.
 *
 * `Root` resolves the theme once and provides the resulting slot functions together with
 * whatever `ui` it was given, so `size`, `variant`, `colorPalette` and every per-slot
 * override are set in one place and each part below injects its own class.
 *
 * Every part sets `inheritAttrs: false` and merges `attrs.class` through its slot
 * function, so a caller's class is resolved by `tailwind-merge` rather than concatenated
 * by Vue.
 */
type AccordionStyles = {
  slots: ReturnType<Themes["accordion"]>;
  ui: AccordionSlots | undefined;
};

const stylesKey: InjectionKey<ComputedRef<AccordionStyles>> = Symbol("neo-accordion");

const injectStyles = (part: string): ComputedRef<AccordionStyles> => {
  const styles = inject(stylesKey, null);

  if (!styles) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return styles;
};

export type AccordionProps = AccordionVariants & {
  /**
   * Per-slot class overrides for the whole accordion — `{ itemTrigger: "text-lg" }`
   * reaches every trigger below, without the parts having to be given props one by one.
   */
  ui?: AccordionSlots;
};

const rootProps = {
  variant: { type: String as PropType<AccordionProps["variant"]>, default: undefined },
  size: { type: String as PropType<AccordionProps["size"]>, default: undefined },
  colorPalette: {
    type: String as PropType<AccordionProps["colorPalette"]>,
    default: undefined,
  },
  ui: { type: Object as PropType<AccordionProps["ui"]>, default: undefined },
};

/** Shared by `Root` and `RootProvider`: resolve the theme, publish it, return the class. */
const useRootStyles = (props: {
  variant?: AccordionProps["variant"];
  size?: AccordionProps["size"];
  colorPalette?: AccordionProps["colorPalette"];
  ui?: AccordionProps["ui"];
}) => {
  const theme = useComponentTheme("accordion");

  const styles = computed<AccordionStyles>(() => ({
    slots: theme.value({
      variant: props.variant,
      size: props.size,
      colorPalette: props.colorPalette,
    }),
    ui: props.ui,
  }));

  provide(stylesKey, styles);

  return styles;
};

export const Root = defineComponent({
  name: "NeoAccordionRoot",
  inheritAttrs: false,
  props: rootProps,
  setup(props, { slots, attrs }) {
    const styles = useRootStyles(props);

    return () =>
      h(
        Ark.Root,
        {
          ...attrs,
          class: styles.value.slots.root({
            class: [styles.value.ui?.root, attrs.class as ClassValue],
          }),
        },
        slots.default,
      );
  },
});

/** `Root`'s counterpart for the `useAccordion` composable — same styling, external state. */
export const RootProvider = defineComponent({
  name: "NeoAccordionRootProvider",
  inheritAttrs: false,
  props: {
    ...rootProps,
    // The `useAccordion()` API object. Vue unwraps the composable's ref in a template,
    // so `:value="myAccordion"` is what a caller writes.
    value: {
      type: Object as PropType<UnwrapRef<UseAccordionReturn>>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const styles = useRootStyles(props);

    return () =>
      h(
        Ark.RootProvider,
        {
          ...attrs,
          value: props.value,
          class: styles.value.slots.root({
            class: [styles.value.ui?.root, attrs.class as ClassValue],
          }),
        },
        slots.default,
      );
  },
});

export const Item = defineComponent({
  name: "NeoAccordionItem",
  inheritAttrs: false,
  // Declared rather than left to fall through, because Ark requires it: a render
  // function has no template to make the omission obvious.
  props: {
    value: { type: String, required: true },
  },
  setup(props, { slots, attrs }) {
    const styles = injectStyles("Item");

    return () =>
      h(
        Ark.Item,
        {
          ...attrs,
          value: props.value,
          class: styles.value.slots.item({
            class: [styles.value.ui?.item, attrs.class as ClassValue],
          }),
        },
        slots.default,
      );
  },
});

export const ItemTrigger = defineComponent({
  name: "NeoAccordionItemTrigger",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const styles = injectStyles("ItemTrigger");

    return () =>
      h(
        Ark.ItemTrigger,
        {
          ...attrs,
          class: styles.value.slots.itemTrigger({
            class: [styles.value.ui?.itemTrigger, attrs.class as ClassValue],
          }),
        },
        slots.default,
      );
  },
});

export const ItemIndicator = defineComponent({
  name: "NeoAccordionItemIndicator",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const styles = injectStyles("ItemIndicator");

    return () =>
      h(
        Ark.ItemIndicator,
        {
          ...attrs,
          class: styles.value.slots.itemIndicator({
            class: [styles.value.ui?.itemIndicator, attrs.class as ClassValue],
          }),
        },
        () => [
          slots.default?.() ?? h(ChevronDownIcon, { "aria-hidden": "true", focusable: "false" }),
        ],
      );
  },
});

/**
 * Renders the theme's `itemBody` wrapper around its children. The panel's height is what
 * animates, and a padded element cannot collapse below its own padding — so the padding
 * lives one level in, and callers never have to know that.
 */
export const ItemContent = defineComponent({
  name: "NeoAccordionItemContent",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const styles = injectStyles("ItemContent");

    return () =>
      h(
        Ark.ItemContent,
        {
          ...attrs,
          class: styles.value.slots.itemContent({
            class: [styles.value.ui?.itemContent, attrs.class as ClassValue],
          }),
        },
        () => [
          h(
            "div",
            { class: styles.value.slots.itemBody({ class: styles.value.ui?.itemBody }) },
            slots.default?.(),
          ),
        ],
      );
  },
});
