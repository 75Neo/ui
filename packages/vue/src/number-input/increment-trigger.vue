<script setup lang="ts">
import { computed } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cva } from "class-variance-authority";
import { Plus as PlusIcon } from "@lucide/vue";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputIncrementTrigger = cva(
  "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
  {
    variants: {
      size: numberInputSizeData.incrementTrigger,
      orientation: numberInputOrientationData.incrementTrigger,
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
const incrementTriggerClass = computed(() =>
  cn(numberInputIncrementTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.IncrementTrigger data-slot="number-input-increment-trigger" :class="incrementTriggerClass">
    <slot>
      <component :is="PlusIcon" />
    </slot>
  </Ark.IncrementTrigger>
</template>
