<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cn } from "cn";
import { accordionStyles as styles } from "@/registry/shared/lib/accordion.styles";

interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :value="props.value" :disabled="props.disabled" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
