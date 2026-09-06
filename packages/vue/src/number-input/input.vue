<script setup lang="ts">
import { computed } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cva } from "class-variance-authority";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputInput = cva(
  "min-w-0 bg-transparent text-highlighted tabular-nums outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: {
      size: numberInputSizeData.input,
      orientation: numberInputOrientationData.input,
    },
    defaultVariants: numberInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Shown while the field is empty. */
  placeholder?: string;
}>();

const variants = useNumberInputVariants();
const inputClass = computed(() =>
  cn(numberInputInput(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Input data-slot="number-input-input" :class="inputClass" :placeholder="props.placeholder" />
</template>
