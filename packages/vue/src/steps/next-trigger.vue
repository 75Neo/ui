<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-inverted font-medium text-inverted outline-primary/25 transition-colors hover:bg-inverted/90 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50",
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
const nextTriggerClass = computed(() =>
  cn(stepsNextTrigger({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.NextTrigger data-slot="steps-next-trigger" :class="nextTriggerClass">
    <slot>Next</slot>
  </Ark.NextTrigger>
</template>
