<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

interface AccordionProps {
  defaultValue?: string[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  lazyMount?: boolean;
  unmountOnExit?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: undefined,
  collapsible: undefined,
  disabled: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = accordion();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :multiple="props.multiple"
    :collapsible="props.collapsible"
    :disabled="props.disabled"
    :orientation="props.orientation"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
