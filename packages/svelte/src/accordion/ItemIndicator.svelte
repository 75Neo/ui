<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  // Imported per icon rather than from the barrel, which Lucide recommends so Vite's
  // dev server does not have to process the whole set.
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { getAccordionSlots } from "./context";

  export type ItemIndicatorProps = Omit<Ark.ItemIndicatorProps, "class"> & {
    class?: string;
  };

  let { class: className, children, ...rest }: ItemIndicatorProps = $props();

  const slots = getAccordionSlots("ItemIndicator");
</script>

<Ark.ItemIndicator class={cx(slots().itemIndicator, className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon aria-hidden="true" focusable="false" />
  {/if}
</Ark.ItemIndicator>
