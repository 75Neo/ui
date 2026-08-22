import { accordion, type AccordionVariantProps } from "@75neo/styles/recipes";
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

/**
 * The shared `accordion` slot recipe wearing Ark's accordion.
 *
 * `Root` resolves the recipe once and provides the resulting slot class names, so
 * `size`, `variant` and `colorPalette` are set in one place and every part below injects
 * its own class. Only `Root` declares props; everywhere else Ark's own props and the
 * caller's `class` fall through as attrs, which Vue merges for us.
 */
type AccordionSlots = ReturnType<typeof accordion>;

const slotsKey: InjectionKey<ComputedRef<AccordionSlots>> = Symbol("neo-accordion");

const injectSlots = (part: string): ComputedRef<AccordionSlots> => {
  const slots = inject(slotsKey, null);

  if (!slots) {
    throw new Error(`<Accordion.${part} /> must be rendered inside <Accordion.Root />`);
  }

  return slots;
};

export type AccordionProps = AccordionVariantProps;

const variantProps = {
  variant: { type: String as PropType<AccordionProps["variant"]>, default: undefined },
  size: { type: String as PropType<AccordionProps["size"]>, default: undefined },
  colorPalette: {
    type: String as PropType<AccordionProps["colorPalette"]>,
    default: undefined,
  },
};

export const Root = defineComponent({
  name: "NeoAccordionRoot",
  props: variantProps,
  setup(props, { slots }) {
    const classes = computed(() => accordion(props));

    provide(slotsKey, classes);

    return () => h(Ark.Root, { class: classes.value.root }, slots.default);
  },
});

/** `Root`'s counterpart for the `useAccordion` composable — same styling, external state. */
export const RootProvider = defineComponent({
  name: "NeoAccordionRootProvider",
  props: {
    ...variantProps,
    // The `useAccordion()` API object. Vue unwraps the composable's ref in a template,
    // so `:value="myAccordion"` is what a caller writes.
    value: {
      type: Object as PropType<UnwrapRef<UseAccordionReturn>>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classes = computed(() => accordion(props));

    provide(slotsKey, classes);

    return () =>
      h(Ark.RootProvider, { class: classes.value.root, value: props.value }, slots.default);
  },
});

export const Item = defineComponent({
  name: "NeoAccordionItem",
  // Declared rather than left to fall through, because Ark requires it: a render
  // function has no template to make the omission obvious.
  props: {
    value: { type: String, required: true },
  },
  setup(props, { slots }) {
    const classes = injectSlots("Item");

    return () => h(Ark.Item, { class: classes.value.item, value: props.value }, slots.default);
  },
});

export const ItemTrigger = defineComponent({
  name: "NeoAccordionItemTrigger",
  setup(_, { slots }) {
    const classes = injectSlots("ItemTrigger");

    return () => h(Ark.ItemTrigger, { class: classes.value.itemTrigger }, slots.default);
  },
});

export const ItemIndicator = defineComponent({
  name: "NeoAccordionItemIndicator",
  setup(_, { slots }) {
    const classes = injectSlots("ItemIndicator");

    return () =>
      h(Ark.ItemIndicator, { class: classes.value.itemIndicator }, () => [
        slots.default?.() ?? h(ChevronDownIcon, { "aria-hidden": "true", focusable: "false" }),
      ]);
  },
});

/**
 * Renders the recipe's `itemBody` wrapper around its children. The panel's height is
 * what animates, and a padded element cannot collapse below its own padding — so the
 * padding lives one level in, and callers never have to know that.
 */
export const ItemContent = defineComponent({
  name: "NeoAccordionItemContent",
  setup(_, { slots }) {
    const classes = injectSlots("ItemContent");

    return () =>
      h(Ark.ItemContent, { class: classes.value.itemContent }, () => [
        h("div", { class: classes.value.itemBody }, slots.default?.()),
      ]);
  },
});
