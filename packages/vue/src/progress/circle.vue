<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressCircle = cva("shrink-0", {
  variants: { size: progressSizeData.circle },
  defaultVariants: progressDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useProgressVariants();
const circleClass = computed(() =>
  cn(progressCircle({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Circle data-slot="progress-circle" :class="circleClass">
    <slot />
  </Ark.Circle>
</template>
