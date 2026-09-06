<script setup lang="ts">
import { computed } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cva } from "class-variance-authority";
import { cn, pinInputDefaults, pinInputInputCompoundData, pinInputSizeData } from "@75neo/themes";
import { usePinInputVariants } from "./variants";

const pinInputInput = cva(
  "bg-default text-center font-medium text-highlighted tabular-nums ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error",
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
      size: pinInputSizeData.input,
    },
    compoundVariants: pinInputInputCompoundData,
    defaultVariants: pinInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Which box this is, from zero. */
  index: number;
}>();

const variants = usePinInputVariants();
const inputClass = computed(() => cn(pinInputInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input data-slot="pin-input-input" :index="props.index" :class="inputClass" />
</template>
