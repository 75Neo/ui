<script setup lang="ts">
import { cn, footerClasses } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!-- The start of the row, usually a copyright line. -->
  <div data-slot="footer-start" :class="cn(footerClasses.start, props.class as string | undefined)">
    <slot />
  </div>
</template>
