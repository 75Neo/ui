<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-elevated font-medium text-default outline-primary/25 transition-colors hover:bg-accented/75 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: { size: stepsSizeData.triggerButton },
    defaultVariants: stepsDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useStepsVariants();
const prevTriggerClass = computed(() =>
  cn(stepsPrevTrigger({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.PrevTrigger data-slot="steps-prev-trigger" :class="prevTriggerClass">
    <slot>Back</slot>
  </Ark.PrevTrigger>
</template>
