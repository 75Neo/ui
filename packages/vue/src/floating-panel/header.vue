<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelHeader = cva(
  "flex cursor-grab items-center gap-2 border-b border-default active:cursor-grabbing",
  {
    variants: { size: floatingPanelSizeData.header },
    defaultVariants: floatingPanelDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFloatingPanelVariants();
const headerClass = computed(() =>
  cn(floatingPanelHeader(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Header data-slot="floating-panel-header" :class="headerClass">
    <slot />
  </Ark.Header>
</template>
