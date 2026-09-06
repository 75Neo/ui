<script setup lang="ts">
import { cn, containerClass } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!-- The measure every page's content is held to. -->
  <div data-slot="container" :class="cn(containerClass, props.class as string | undefined)">
    <slot />
  </div>
</template>
