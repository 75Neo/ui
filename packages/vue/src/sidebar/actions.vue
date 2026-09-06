<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, sidebarClasses, sidebarCollapsibleData, sidebarDefaults } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarActions = cva(sidebarClasses.actions, {
  variants: { collapsible: sidebarCollapsibleData.actions },
  defaultVariants: sidebarDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const sidebar = useSidebarVariants();
const actionsClass = computed(() =>
  cn(sidebarActions({ collapsible: sidebar.collapsible }), props.class as string | undefined),
);
</script>

<template>
  <div data-slot="sidebar-actions" :class="actionsClass">
    <slot />
  </div>
</template>
