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
  <!-- The end of the row, usually social or legal links. -->
  <div data-slot="footer-end" :class="cn(footerClasses.end, props.class as string | undefined)">
    <slot />
  </div>
</template>
