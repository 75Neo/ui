<script setup lang="ts">
import { computed } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cva } from "class-variance-authority";
import {
  cn,
  dateInputControlCompoundData,
  dateInputDefaults,
  dateInputSizeData,
} from "@75neo/themes";
import { useDateInputVariants } from "./variants";

const dateInputControl = cva(
  "flex min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: dateInputSizeData.control,
    },
    compoundVariants: dateInputControlCompoundData,
    defaultVariants: dateInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDateInputVariants();
const controlClass = computed(() =>
  cn(dateInputControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="date-input-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
