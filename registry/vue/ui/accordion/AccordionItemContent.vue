<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

interface AccordionItemContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AccordionItemContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = accordion();
</script>

<template>
  <Ark.ItemContent :class="cn(styles.itemContent(), props.class)">
    <slot />
  </Ark.ItemContent>
</template>
