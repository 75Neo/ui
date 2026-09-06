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
  <!-- A full-width band above the row. -->
  <div data-slot="footer-top" :class="cn(footerClasses.band, props.class as string | undefined)">
    <slot />
  </div>
</template>
