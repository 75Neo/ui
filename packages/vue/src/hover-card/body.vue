<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardBody = cva("min-w-0 text-toned", {
  variants: { size: hoverCardSizeData.body },
  defaultVariants: hoverCardDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useHoverCardVariants();
const bodyClass = computed(() => cn(hoverCardBody(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="hover-card-body" :class="bodyClass">
    <slot />
  </div>
</template>
