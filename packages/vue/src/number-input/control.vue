<script setup lang="ts">
import { computed } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cva } from "class-variance-authority";
import {
  cn,
  numberInputControlCompoundData,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputControl = cva(
  "w-full min-w-0 overflow-hidden bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: numberInputSizeData.control,
      orientation: numberInputOrientationData.control,
    },
    compoundVariants: numberInputControlCompoundData,
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
const controlClass = computed(() =>
  cn(numberInputControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="number-input-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
