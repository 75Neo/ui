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
  <!-- The bar's row, held to the Container's measure. -->
  <div data-slot="header-row" :class="cn(headerClasses.row, props.class as string | undefined)">
    <slot />
  </div>
</template>
