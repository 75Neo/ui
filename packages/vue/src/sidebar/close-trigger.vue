<script setup lang="ts">
import { X } from "@lucide/vue";
import { cn, sidebarClasses } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const sidebar = useSidebarVariants();
</script>

<template>
  <button
    type="button"
    aria-label="Collapse sidebar"
    data-slot="sidebar-close-trigger"
    :class="cn(sidebarClasses.closeTrigger, props.class as string | undefined)"
    @click="sidebar.setOpen(false)"
  >
    <slot>
      <component :is="X" />
    </slot>
  </button>
</template>
