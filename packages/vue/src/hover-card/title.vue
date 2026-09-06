<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardTitle = cva("font-semibold text-highlighted", {
  variants: { size: hoverCardSizeData.title },
  defaultVariants: hoverCardDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useHoverCardVariants();
const titleClass = computed(() => cn(hoverCardTitle(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="hover-card-title" :class="titleClass">
    <slot />
  </div>
</template>
