<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionSlots } from "./context";

  export type ItemProps = Omit<Ark.ItemProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemProps = $props();

  const slots = getAccordionSlots("Item");
</script>

<Ark.Item class={cx(slots().item, className)} {...rest}>
  {@render children?.()}
</Ark.Item>
