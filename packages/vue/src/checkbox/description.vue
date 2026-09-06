<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: checkboxSizeData.description },
  defaultVariants: checkboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCheckboxVariants();
const descriptionClass = computed(() =>
  cn(checkboxDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <p data-slot="checkbox-description" :class="descriptionClass">
    <slot />
  </p>
</template>
