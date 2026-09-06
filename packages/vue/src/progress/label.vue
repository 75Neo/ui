<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressLabel = cva("font-medium text-highlighted", {
  variants: { size: progressSizeData.label },
  defaultVariants: progressDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useProgressVariants();
const labelClass = computed(() =>
  cn(progressLabel({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Label data-slot="progress-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
