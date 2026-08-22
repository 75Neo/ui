<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionSlots } from "./context";

  export type ItemContentProps = Omit<Ark.ItemContentProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemContentProps = $props();

  const slots = getAccordionSlots("ItemContent");
</script>

<!--
  The `itemBody` wrapper is rendered here rather than left to the caller. The panel's
  height is what animates, and a padded element cannot collapse below its own padding —
  so the padding lives one level in.
-->
<Ark.ItemContent class={cx(slots().itemContent, className)} {...rest}>
  <div class={slots().itemBody}>
    {@render children?.()}
  </div>
</Ark.ItemContent>
