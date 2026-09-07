<script setup lang="ts">
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";

interface TooltipProps {
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  interactive?: boolean;
  closeOnClick?: boolean;
  closeOnEscape?: boolean;
  closeOnScroll?: boolean;
  closeOnPointerDown?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
  interactive: undefined,
  closeOnClick: undefined,
  closeOnEscape: undefined,
  closeOnScroll: undefined,
  closeOnPointerDown: undefined,
});

const open = defineModel<boolean>("open", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :disabled="props.disabled"
    :interactive="props.interactive"
    :close-on-click="props.closeOnClick"
    :close-on-escape="props.closeOnEscape"
    :close-on-scroll="props.closeOnScroll"
    :close-on-pointer-down="props.closeOnPointerDown"
  >
    <slot />
  </Ark.Root>
</template>
