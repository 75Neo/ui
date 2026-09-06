<script setup lang="ts">
import { cn, sidebarClasses } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <p data-slot="sidebar-title" :class="cn(sidebarClasses.title, props.class as string | undefined)">
    <slot />
  </p>
</template>
