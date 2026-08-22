<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { accordion, type AccordionVariantProps } from "@75neo/styles/recipes";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { setAccordionSlots } from "./context";

  // `class` is narrowed to a string so it can be merged by `cx`.
  export type RootProps = Omit<Ark.RootProps, "class"> & AccordionVariantProps & { class?: string };

  let { variant, size, colorPalette, class: className, children, ...rest }: RootProps = $props();

  const slots = $derived(accordion({ variant, size, colorPalette }));

  setAccordionSlots(() => slots);
</script>

<Ark.Root class={cx(slots.root, className)} {...rest}>
  {@render children?.()}
</Ark.Root>
