<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, sidebarClasses, sidebarCollapsibleData, sidebarDefaults } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarBody = cva(sidebarClasses.body, {
  variants: { collapsible: sidebarCollapsibleData.body },
  defaultVariants: sidebarDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const sidebar = useSidebarVariants();
const bodyClass = computed(() =>
  cn(sidebarBody({ collapsible: sidebar.collapsible }), props.class as string | undefined),
);
</script>

<template>
  <div data-slot="sidebar-body" :class="bodyClass">
    <slot />
  </div>
</template>
