<script lang="ts">
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionStyles } from "./context";

  export type ItemTriggerProps = Omit<Ark.ItemTriggerProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemTriggerProps = $props();

  const styles = getAccordionStyles("ItemTrigger");
</script>

<Ark.ItemTrigger
  class={styles().slots.itemTrigger({ class: [styles().ui?.itemTrigger, className] })}
  {...rest}
>
  {@render children?.()}
</Ark.ItemTrigger>
