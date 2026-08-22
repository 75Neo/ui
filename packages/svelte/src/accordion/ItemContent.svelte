<script lang="ts">
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionStyles } from "./context";

  export type ItemContentProps = Omit<Ark.ItemContentProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemContentProps = $props();

  const styles = getAccordionStyles("ItemContent");
</script>

<!--
  The `itemBody` wrapper is rendered here rather than left to the caller. The panel's
  height is what animates, and a padded element cannot collapse below its own padding —
  so the padding lives one level in.
-->
<Ark.ItemContent
  class={styles().slots.itemContent({ class: [styles().ui?.itemContent, className] })}
  {...rest}
>
  <div class={styles().slots.itemBody({ class: styles().ui?.itemBody })}>
    {@render children?.()}
  </div>
</Ark.ItemContent>
