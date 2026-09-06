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
  <h1
    data-slot="error-status-message"
    :class="
      cn(
        'mt-2 text-4xl font-bold text-balance text-highlighted sm:text-5xl',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </h1>
</template>
