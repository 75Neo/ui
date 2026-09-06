<script setup lang="ts">
import { computed } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cva } from "class-variance-authority";
import { Minus as MinusIcon } from "@lucide/vue";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputDecrementTrigger = cva(
  "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
  {
    variants: {
      size: numberInputSizeData.decrementTrigger,
      orientation: numberInputOrientationData.decrementTrigger,
    },
    defaultVariants: numberInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNumberInputVariants();
const decrementTriggerClass = computed(() =>
  cn(numberInputDecrementTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.DecrementTrigger data-slot="number-input-decrement-trigger" :class="decrementTriggerClass">
    <slot>
      <component :is="MinusIcon" />
    </slot>
  </Ark.DecrementTrigger>
</template>
