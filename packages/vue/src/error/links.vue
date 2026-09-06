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
    data-slot="error-links"
    :class="
      cn('mt-8 flex flex-wrap items-center justify-center gap-3', props.class as string | undefined)
    "
  >
    <slot />
  </div>
</template>
