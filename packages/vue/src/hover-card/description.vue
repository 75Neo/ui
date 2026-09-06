<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardDescription = cva("text-muted", {
  variants: { size: hoverCardSizeData.description },
  defaultVariants: hoverCardDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useHoverCardVariants();
const descriptionClass = computed(() =>
  cn(hoverCardDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <p data-slot="hover-card-description" :class="descriptionClass">
    <slot />
  </p>
</template>
