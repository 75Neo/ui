<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, errorColorData, errorDefaults } from "@75neo/themes";
import { useErrorVariants } from "./variants";

const errorStatusCode = cva("text-base font-semibold", {
  variants: { color: errorColorData.statusCode },
  defaultVariants: errorDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useErrorVariants();
const statusCodeClass = computed(() =>
  cn(errorStatusCode(variants), props.class as string | undefined),
);
</script>

<template>
  <p data-slot="error-status-code" :class="statusCodeClass">
    <slot />
  </p>
</template>
