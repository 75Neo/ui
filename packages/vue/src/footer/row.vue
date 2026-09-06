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
  <!--
    The three-region row, held to the Container's measure. The regions go into the DOM
    in the order end, center, start and are put back into reading order by their own
    order classes, so a phone stacks the links above the copyright.
  -->
  <div data-slot="footer-row" :class="cn(footerClasses.row, props.class as string | undefined)">
    <slot />
  </div>
</template>
