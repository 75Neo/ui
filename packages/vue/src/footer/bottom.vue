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
  <!-- A full-width band below the row. -->
  <div data-slot="footer-bottom" :class="cn(footerClasses.band, props.class as string | undefined)">
    <slot />
  </div>
</template>
