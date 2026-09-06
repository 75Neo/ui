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
  <p
    data-slot="sidebar-description"
    :class="cn(sidebarClasses.description, props.class as string | undefined)"
  >
    <slot />
  </p>
</template>
