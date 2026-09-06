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
    data-slot="drawer-header"
    :class="
      cn(
        'flex shrink-0 items-start gap-3 border-b border-muted px-5 py-4',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </div>
</template>
