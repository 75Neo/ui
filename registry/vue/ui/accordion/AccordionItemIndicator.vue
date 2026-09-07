<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

interface AccordionItemIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AccordionItemIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = accordion();
</script>

<template>
  <Ark.ItemIndicator :class="cn(styles.itemIndicator(), props.class)">
    <slot />
  </Ark.ItemIndicator>
</template>
