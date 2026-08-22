<script lang="ts">
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionStyles } from "./context";

  export type ItemProps = Omit<Ark.ItemProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemProps = $props();

  const styles = getAccordionStyles("Item");
</script>

<Ark.Item class={styles().slots.item({ class: [styles().ui?.item, className] })} {...rest}>
  {@render children?.()}
</Ark.Item>
