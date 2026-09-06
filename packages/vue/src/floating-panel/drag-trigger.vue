<script setup lang="ts">
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.DragTrigger
    data-slot="floating-panel-drag-trigger"
    :class="cn('contents', props.class as string | undefined)"
  >
    <slot />
  </Ark.DragTrigger>
</template>
