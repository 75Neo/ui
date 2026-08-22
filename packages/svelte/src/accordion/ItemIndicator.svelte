<script lang="ts">
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  // Imported per icon rather than from the barrel, which Lucide recommends so Vite's
  // dev server does not have to process the whole set.
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { getAccordionStyles } from "./context";

  export type ItemIndicatorProps = Omit<Ark.ItemIndicatorProps, "class"> & {
    class?: string;
  };

  let { class: className, children, ...rest }: ItemIndicatorProps = $props();

  const styles = getAccordionStyles("ItemIndicator");
</script>

<Ark.ItemIndicator
  class={styles().slots.itemIndicator({ class: [styles().ui?.itemIndicator, className] })}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon aria-hidden="true" focusable="false" />
  {/if}
</Ark.ItemIndicator>
