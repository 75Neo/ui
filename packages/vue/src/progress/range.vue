<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressColorData, progressDefaults } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressRange = cva(
  "h-full rounded-full transition-[width] duration-200 data-[orientation=vertical]:size-full data-[state=indeterminate]:w-1/3 data-[state=indeterminate]:animate-progress-sweep",
  {
    variants: { color: progressColorData.range },
    defaultVariants: progressDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useProgressVariants();
const rangeClass = computed(() =>
  cn(progressRange({ color: variants.color }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Range data-slot="progress-range" :class="rangeClass" />
</template>
