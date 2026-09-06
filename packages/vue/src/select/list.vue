<script setup lang="ts">
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="select-list"
    :class="
      cn('min-h-0 flex-1 overflow-y-auto overscroll-contain', props.class as string | undefined)
    "
  >
    <slot />
  </div>
</template>
