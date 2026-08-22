<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { getAccordionSlots } from "./context";

  export type ItemTriggerProps = Omit<Ark.ItemTriggerProps, "class"> & { class?: string };

  let { class: className, children, ...rest }: ItemTriggerProps = $props();

  const slots = getAccordionSlots("ItemTrigger");
</script>

<Ark.ItemTrigger class={cx(slots().itemTrigger, className)} {...rest}>
  {@render children?.()}
</Ark.ItemTrigger>
