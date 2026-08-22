<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { accordion, type AccordionVariantProps } from "@75neo/styles/recipes";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { setAccordionSlots } from "./context";

  /** `Root`'s counterpart for the `useAccordion` hook — same styling, external state. */
  export type RootProviderProps = Omit<Ark.RootProviderProps, "class"> &
    AccordionVariantProps & { class?: string };

  let {
    variant,
    size,
    colorPalette,
    class: className,
    children,
    ...rest
  }: RootProviderProps = $props();

  const slots = $derived(accordion({ variant, size, colorPalette }));

  setAccordionSlots(() => slots);
</script>

<Ark.RootProvider class={cx(slots.root, className)} {...rest}>
  {@render children?.()}
</Ark.RootProvider>
