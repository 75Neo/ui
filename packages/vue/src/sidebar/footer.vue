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
  <div
    data-slot="sidebar-footer"
    :class="cn(sidebarClasses.footer, props.class as string | undefined)"
  >
    <slot />
  </div>
</template>
