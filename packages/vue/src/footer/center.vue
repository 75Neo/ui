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
  <!-- The middle of the row, usually a short navigation. -->
  <div
    data-slot="footer-center"
    :class="cn(footerClasses.center, props.class as string | undefined)"
  >
    <slot />
  </div>
</template>
