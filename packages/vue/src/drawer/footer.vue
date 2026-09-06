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
  <footer
    data-slot="drawer-footer"
    :class="
      cn(
        'flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40 px-5 py-4',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </footer>
</template>
