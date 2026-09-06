<script setup lang="ts">
import { computed } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cva } from "class-variance-authority";
import {
  cn,
  radioGroupControlCompoundData,
  radioGroupDefaults,
  radioGroupSizeData,
} from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemControl = cva(
  "group/control inline-flex shrink-0 items-center justify-center rounded-full bg-default ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
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
      size: radioGroupSizeData.control,
    },
    compoundVariants: radioGroupControlCompoundData,
    defaultVariants: radioGroupDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRadioGroupVariants();
const itemControlClass = computed(() =>
  cn(radioGroupItemControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemControl data-slot="radio-group-item-control" :class="itemControlClass">
    <slot />
  </Ark.ItemControl>
</template>
