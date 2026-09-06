<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, errorColorData, errorDefaults } from "@75neo/themes";
import { useErrorVariants } from "./variants";

const errorIcon = cva("size-10 shrink-0 [&>svg]:size-full", {
  variants: { color: errorColorData.icon },
  defaultVariants: errorDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useErrorVariants();
const iconClass = computed(() => cn(errorIcon(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="error-leading" class="mb-4 flex items-center justify-center">
    <span data-slot="error-icon" :class="iconClass">
      <slot />
    </span>
  </div>
</template>
