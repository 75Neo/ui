<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

interface AccordionItemTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AccordionItemTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = accordion();
</script>

<template>
  <Ark.ItemTrigger :class="cn(styles.itemTrigger(), props.class)">
    <slot />
  </Ark.ItemTrigger>
</template>
