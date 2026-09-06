<script setup lang="ts">
import { cn, headerClasses } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div data-slot="header-end" :class="cn(headerClasses.end, props.class as string | undefined)">
    <slot />
  </div>
</template>
