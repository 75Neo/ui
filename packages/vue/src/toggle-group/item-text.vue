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
  <span
    data-slot="toggle-group-item-text"
    :class="cn('truncate', props.class as string | undefined)"
  >
    <slot />
  </span>
</template>
