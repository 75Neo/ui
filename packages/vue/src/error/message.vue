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
  <p
    data-slot="error-message"
    :class="cn('mt-4 text-lg text-pretty text-muted', props.class as string | undefined)"
  >
    <slot />
  </p>
</template>
