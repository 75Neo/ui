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
  <div data-slot="header-start" :class="cn(headerClasses.start, props.class as string | undefined)">
    <slot />
  </div>
</template>
