<script setup lang="ts">
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";

interface FloatingPanelProps {
  defaultOpen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  lockAspectRatio?: boolean;
  allowOverflow?: boolean;
  closeOnEscape?: boolean;
  disabled?: boolean;
  gridSize?: number;
  persistRect?: boolean;
}

const props = withDefaults(defineProps<FloatingPanelProps>(), {
  defaultOpen: undefined,
  draggable: undefined,
  resizable: undefined,
  lockAspectRatio: undefined,
  allowOverflow: undefined,
  closeOnEscape: undefined,
  disabled: undefined,
  persistRect: undefined,
});

const open = defineModel<boolean>("open");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :draggable="props.draggable"
    :resizable="props.resizable"
    :lock-aspect-ratio="props.lockAspectRatio"
    :allow-overflow="props.allowOverflow"
    :close-on-escape="props.closeOnEscape"
    :disabled="props.disabled"
    :grid-size="props.gridSize"
    :persist-rect="props.persistRect"
  >
    <slot />
  </Ark.Root>
</template>
