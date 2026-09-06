<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressColorData, progressDefaults } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressCircleRange = cva(
  "fill-transparent transition-[stroke-dashoffset] duration-200 [stroke-linecap:round]",
  {
    variants: { color: progressColorData.circleRange },
    defaultVariants: progressDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useProgressVariants();
const circleRangeClass = computed(() =>
  cn(progressCircleRange({ color: variants.color }), props.class as string | undefined),
);
</script>

<template>
  <Ark.CircleRange data-slot="progress-circle-range" :class="circleRangeClass" />
</template>
