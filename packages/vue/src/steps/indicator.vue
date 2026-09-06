<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsColorData, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsIndicator = cva(
  "group/steps-indicator inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-default ring-inset [&>svg]:size-[1em]",
  {
    variants: {
      size: stepsSizeData.indicator,
      color: stepsColorData.indicator,
    },
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
const indicatorClass = computed(() =>
  cn(stepsIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="steps-indicator" :class="indicatorClass">
    <slot />
  </Ark.Indicator>
</template>
