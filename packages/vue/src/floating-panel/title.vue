<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelTitle = cva(
  "flex min-w-0 flex-1 items-center gap-2 font-semibold text-highlighted [&>svg]:shrink-0",
  {
    variants: { size: floatingPanelSizeData.title },
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
const titleClass = computed(() =>
  cn(floatingPanelTitle(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Title data-slot="floating-panel-title" :class="titleClass">
    <slot />
  </Ark.Title>
</template>
